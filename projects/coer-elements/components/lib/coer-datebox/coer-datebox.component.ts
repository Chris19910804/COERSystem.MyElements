import { Component, computed, ElementRef, Input, input, OnInit, output, signal, viewChild } from '@angular/core';
import { CONTROL_VALUE, ControlValue, DateTime, Tools } from 'coer-elements/tools';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import moment from 'moment';

@Component({
    selector: 'coer-datebox',
    templateUrl: './coer-datebox.component.html',
    styleUrl: './coer-datebox.component.scss',
    providers: [   
        provideNativeDateAdapter(),
        CONTROL_VALUE(CoerDateBox),
    ],
    standalone: false
})
export class CoerDateBox extends ControlValue implements OnInit {
 

    //Component Value
    public override _value: string | Date | moment.Moment | null = null;
    protected matFormField = viewChild.required<ElementRef>('matFormField');
    protected coerTextBox = viewChild.required<ElementRef>('coerTextBox');
     

    //Variables
    protected _id: string = Tools.GetGuid('coer-datebox');
    private _datepicker = viewChild<MatDatepicker<any>>('datepicker');
    protected _isLoadingEvent = signal<boolean>(false);
    protected _isOpen: boolean = false;
    private _input!: HTMLInputElement;
    private _container!: HTMLInputElement;
    private _pickerButton!: HTMLInputElement;
    
    //Inputs
    @Input() set value(value: string | null | undefined) {
        if(Tools.IsNull(value)) value = null;
        this.SetValue(value);
    }
     
    public id           = input<string>('');    
    public label        = input<string>('');    
    public placeholder  = input<string>('');
    public textPosition = input<'left' | 'center' | 'right'>('left');     
    public isInvalid    = input<boolean>(false);
    public isValid      = input<boolean>(false);
    public isLoading    = input<boolean>(false);
    public isDisabled   = input<boolean>(false);
    public isReadonly   = input<boolean>(false);
    public isInvisible  = input<boolean>(false);    
    public width        = input<string>('100%');
    public minWidth     = input<string>('190px');
    public maxWidth     = input<string>('100%');   
    public marginTop    = input<string>('0px');
    public marginRight  = input<string>('0px');
    public marginBottom = input<string>('0px');
    public marginLeft   = input<string>('0px');

    //Outputs
    public onOpen = output<void>();
    public onClose = output<void>(); 
    public onChangeValue = output<string | null>(); 

    ngOnInit() {
        this._SetEvents();
    }


    //computed
    protected _floatLabel = computed<'auto' | 'always'>(() => {
        return this.label() == '' ? 'always' : 'auto'
    });


    //computed
    protected _paddingRight = computed(() => {
        return this.isInvalid() || this.isValid()
            ? '18px' : '0px';
    });


    //computed
    protected _isEnable = computed<boolean>(() => {
        return !this.isDisabled() && !this.isLoading() && !this.isReadonly() && !this.isInvisible();
    });


    //getter
    public get value(): string | null {
        return Tools.IsNotOnlyWhiteSpace(this._value) 
            ? DateTime.GetFormatDB(this._value!)
            : null;
    }


    //getter
    public get isOpen(): boolean { 
        return this._isOpen;
    }


    //getter
    public get isClose(): boolean { 
        return !this._isOpen;
    }


    //ControlValueAccessor
    public override SetValue(value: string | Date | moment.Moment | null | undefined): void {  
        if(value === undefined) value = null;
        
        if(Tools.IsNotNull(this._value) && Tools.IsNull(value)) {
            this.onChangeValue.emit(null); 
        }

        if (Tools.IsNotOnlyWhiteSpace(value)) {
            if(DateTime.IsValidDate(value!)) {
                value = DateTime.GetFormatDB(value!);
                this._value = new Date(value);
                this.onChangeValue.emit(DateTime.GetFormatDB(this._value));
            }

            else this._value = null;             
        } 

        else this._value = null; 
        
        if(typeof this._UpdateValue === 'function') {
            this._UpdateValue(this._value);
        }
    }


    /** */
    public override writeValue(value: any): void {
        if(Tools.IsNotOnlyWhiteSpace(value)) {
            this.SetValue(value);
        }
    }


    /** */
    private _SetEvents(): void {
        Tools.Sleep().then(()=> {
            //input
            this._input = document.getElementById(this._id)! as HTMLInputElement;
             
            if (this._input) { 
                this._input.addEventListener('focus', () => this._Blur());
                this._input.addEventListener('blur', () => this._Blur());
            }

            //container
            this._container = document.getElementById(`${this._id}-container`)! as HTMLInputElement; 
             
            if (this._container) {               
                this._container.addEventListener('click', (event) => {
                    event.stopPropagation();
                    event.preventDefault(); 
                    this.Open();
                });
            } 

            //pickerButton
            this._pickerButton = document.querySelector(`#${this._id}-container .mat-mdc-form-field-icon-suffix button`)! as HTMLInputElement;
             
            if (this._pickerButton) { 
              
                this._pickerButton.addEventListener('click', (event) => {
                    event.stopPropagation();
                    event.preventDefault(); 
                    this.Open();
                });
            } 
        });
    } 


    /** */
    protected async _Blur(): Promise<void> {        
        if(this._isLoadingEvent()) return;
        else this._isLoadingEvent.set(true);
        this._isOpen = false;

        await Tools.Sleep(); 
        if(this._input) {
            this._input.blur(); 

            Tools.Sleep().then(() => {
                const element = document.querySelector(`#${this._id}-container .mdc-line-ripple--active`);
                if (element) element.classList.remove('mdc-line-ripple--active');
            });
        }

        this._isLoadingEvent.set(false);        
    } 


    /** */ 
    public Open(): void { 
        if (this._isEnable() && !this._isOpen) { 
            this._datepicker()?.open();
            this._isOpen = true;
            this.onOpen.emit();  
        }

        else this._Blur();
    }


    /** */ 
    public Close(): void {   
        if(this.isOpen) {
            this._datepicker()?.close();
            this._Blur();
            this.onClose.emit();
        }  
    }  


    /** */ 
    public Unselect(): void {   
        this.SetValue(null);
    } 
}