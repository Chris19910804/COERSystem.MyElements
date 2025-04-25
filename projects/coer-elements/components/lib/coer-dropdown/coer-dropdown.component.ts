import { AfterViewInit, Component, computed, ElementRef, input, Input, output, signal, viewChild } from '@angular/core';
import { CONTROL_VALUE, ControlValue, Tools } from 'coer-elements/tools';

@Component({
    selector: 'coer-dropdown',
    templateUrl: './coer-dropdown.component.html',
    styleUrl: './coer-dropdown.component.scss',
    providers: [CONTROL_VALUE(CoerDropdown)],
    standalone: false
})
export class CoerDropdown<T> extends ControlValue implements AfterViewInit {

    //Component Value
    protected override _value: T | null = null;

    //Variables 
    protected _coerTextBox = viewChild.required<ElementRef>('coerTextBox');
    protected _id: string = Tools.GetGuid('coer-dropdown');
    protected _index = signal<number>(-1); 
    protected _isOpen = signal<boolean>(false); 
    protected _isOverMenu = signal<boolean>(false); 
    protected _dropDownMenu!: HTMLElement;
    protected _container!: HTMLElement;

    //Inputs
    @Input() set value(value: T | null | undefined) {
        if(Tools.IsNull(value)) value = null;
        this.SetValue(value);
    }
 
    public id           = input<string>('');
    public label        = input<string>('');
    public color        = input<'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'dark'>('default');
    public type         = input<'filled' | 'outline'>('filled');
    public dataSource   = input<T[]>([]);
    public propDisplay  = input<string>('name');
    public rowsByPage   = input<number>(50);     
    public isLoading    = input<boolean>(false);
    public isDisabled   = input<boolean>(false);
    public isReadonly   = input<boolean>(false);
    public isInvisible  = input<boolean>(false);    
    public width        = input<string>('190px');
    public minWidth     = input<string>('150px');
    public maxWidth     = input<string>('100%');    
    public marginTop    = input<string>('0px');
    public marginRight  = input<string>('0px');
    public marginBottom = input<string>('0px');
    public marginLeft   = input<string>('0px');        
    public tooltip         = input<string>('');
    public tooltipPosition = input<'top' | 'right' | 'bottom' | 'left'>('left');

    //Outputs 
    public onSelected = output<T>();
    public onUnselect = output<null>();

    async ngAfterViewInit() {
        await Tools.Sleep();
        this._SetEvents();
    }

    //getter
    public get value(): T | null {
        const value = Tools.BreakReference<any>(this._value);
        if(Tools.IsNotNull(value?.index)) delete value.index;
        if(Tools.IsNotNull(value?.indexRow)) delete value.indexRow;        
        return value;
    }


    //getter
    protected get _label(): string {
        let label = this.label();

        if (this.dataSource().length > 0) {
            if (Tools.IsNotNull(this._value)) {
                label = (this._value as any)[this.propDisplay()]
            } 
        }

        return label;
    }


    //getter
    protected get _icon(): string { 
        return Tools.IsNotNull(this.value) 
            && Tools.IsNotOnlyWhiteSpace((this.value as any)?.icon)
            ? (this.value as any)?.icon || '' : '';
    }


    //computed
    protected _isEnable = computed<boolean>(() => {
        return !this.isDisabled() && !this.isLoading() && !this.isReadonly() && !this.isInvisible();
    }); 


    //computed
    protected _dataSource = computed(() => {
        let index = 0;  
        let dataSource = this.dataSource().map((item: any) => Object.assign(item, { index: index++ })); 

        let indexRow = 0;
        return Tools.BreakReference(dataSource)
            .splice(0, this.rowsByPage())
            .map((item: any) => Object.assign(item, { indexRow: indexRow++ }));
    });


    /** */
    protected override SetValue(_value: any): void {
        if(_value === undefined) _value = null;

        if(Tools.IsNotOnlyWhiteSpace(this._value) && Tools.IsNull(_value)) {
            this.onUnselect.emit(null);
        }

        if(Tools.IsNotNull(this._UpdateValue)) this._UpdateValue(_value);
        this._value = _value; 
    }


    /** */
    public override writeValue(_value: any): void {
        if(_value === undefined) _value = null;
        this._value = _value; 
    }


    /** */
    private _SetEvents(): void {
        Tools.Sleep().then(()=> {
            //Container
            this._container = document.getElementById(`${this._id}-container`)! as HTMLElement;

            this._container.addEventListener('mouseenter', () => {
                this._isOverMenu.set(true);
            });

            this._container.addEventListener('mouseleave', () => {
                this._isOverMenu.set(false);
            });  

            //DropDown
            this._dropDownMenu = document.getElementById(`${this._id}-dropdown-menu`)! as HTMLElement;

            this._dropDownMenu.addEventListener('mouseenter', () => {
                this._isOverMenu.set(true);
            });

            this._dropDownMenu.addEventListener('mouseleave', () => {
                this._isOverMenu.set(false);
            });

            //Document
            document.addEventListener('click', () => {
                if(!this._isOverMenu()) this.Close();
            });
        });
    }


    /** */
    protected _GetIndexRow = (item: any): number => {
        return item['indexRow'];
    }


    /** */
    protected _GetIcon = (item: any): string => {
        return Tools.IsNotNull(item) && Tools.IsNotOnlyWhiteSpace(item?.icon) ? item.icon : '';
    }


    /** */
    protected _GetDisplay = (item: any): string => {
        return Tools.IsNotNull(item) ? item[this.propDisplay()] : '';
    }


    /** */
    protected _GetPath = (item: any): string | (string | number)[] | null => {         
        if (Tools.IsNotNull(item)) {
            if (Tools.IsNotOnlyWhiteSpace(item?.path)) return item?.path;
            if (Tools.IsNotOnlyWhiteSpace(item?.url))  return item?.url;  
            if (Tools.IsNotOnlyWhiteSpace(item?.link)) return item?.link;  
        }

        return null;
    }


    /** */
    protected _SelectItem(item: any): void { 
        if (Tools.IsNotNull(item) && this._isEnable()) {        
            const _item = Tools.BreakReference<any>(this.dataSource()[item.index]);
    
            if(Tools.IsNotNull(_item) && Tools.IsNull(this._GetPath(item))) {
                this.SetValue(Tools.BreakReference(_item)); 
            }
    
            delete _item.indexRow;
            delete _item.index; 
            this.onSelected.emit({ ..._item });     
            Tools.Sleep().then(() => this.Close())
        }
    }


    /** */
    public Unselect(): void { 
        this.SetValue(null);
        this.Close(); 
    } 


    /** */
    protected _Toggle(): void {
        if (this._isOpen()) this.Close();
        else this.Open();
    }


    /** */
    public Open(): void {
       Tools.Sleep().then(_ => {
            if(this._isEnable()) {
                if (!this._dropDownMenu.classList.contains('show')) {
                    this._dropDownMenu.classList.add('show');
                }
    
                this._isOpen.set(true);
            }
        });
    }


    /** */
    public Close(): void {
        Tools.Sleep().then(_ => {
            if (this._dropDownMenu.classList.contains('show')) {
                this._dropDownMenu.classList.remove('show');
            }
    
            this._isOpen.set(false);
        });
    }


    /** */
    public SetValueBy(callback: (row: T) => boolean): void {
        Tools.Sleep().then(_ => {
            if (this._dataSource().length > 0) {
                const value = Tools.BreakReference<any>(this._dataSource().find(callback as any)); 
                 
                if (Tools.IsNotNull(value)) {
                    this.SetValue(value); 
                } 
            }
        });  
    }
}