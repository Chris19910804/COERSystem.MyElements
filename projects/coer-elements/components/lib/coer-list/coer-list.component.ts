import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, computed, input, output } from '@angular/core'; 
import { Screen, Tools } from 'coer-elements/tools';

@Component({
    selector: 'coer-list',
    templateUrl: './coer-list.component.html',
    styleUrl: './coer-list.component.scss',
    standalone: false
})
export class CoerList<T> implements AfterViewInit { 

    //Variables
    protected _id: string = Tools.GetGuid('coer-List');
    protected _enableAnimations: boolean = false;

    //Inputs
    public dataSource            = input<T[]>([]);
    public propDisplay           = input<string>('name');
    public header                = input<string>('');
    public headerIcon            = input<string>('');
    public showDeleteButtonByRow = input<((item: T, index: number) => boolean) | boolean>(false);
    public showGoButtonByRow     = input<((item: T, index: number) => boolean) | boolean>(false);
    public showBackButton        = input<boolean>(false);
    public isLoading             = input<boolean>(false);
    public isDraggable           = input<boolean>(false);
    public showSearch            = input<boolean>(false);
    public template              = input<((item: T, index: number) => string) | null>(null);
    public width                 = input<string>('100%');
    public MinWidth              = input<string>('250px');
    public MaxWidth              = input<string>('100%');
    public height                = input<string>('350px');
    public minHeight             = input<string>('140px');
    public maxHeight             = input<string>('100vh');
    public marginTop             = input<string>('0px');
    public marginRight           = input<string>('0px');
    public marginBottom          = input<string>('0px');
    public marginLeft            = input<string>('0px');

    //Outputs
    public onDrop        = output<T>(); 
    public onSort        = output<T[]>(); 
    public onClick       = output<T>();
    public onDoubleClick = output<T>();
    public onClickDelete = output<T>();
    public onClickGo     = output<T>();
    public onClickBack   = output<void>();

    //computed
    protected _dataSource = computed<T[]>(() => {
        let index = 0;        
        return Tools.BreakReference(this.dataSource())
            .map((item: any) => Object.assign(item, { index: index++ }));
    });


    //computed
    protected _isDraggable = computed<boolean>(() => {
        return this.isDraggable() && !this.isLoading();
    });  


    //computed
    protected _hasTemplate = computed<boolean>(() => {                
        return typeof this.template() == 'function';
    });


    //computed
    protected _showbuttons = computed<boolean>(() => {                
        return !this.isLoading();
    });


    //getter
    protected get _height(): string {
        let height = this.height();

        if (height == 'full') {
            const TOOLBAR = 45;
            const PAGE_HEADER = 70;
            const LIST_HEADER = document.getElementById(`${this._id}-header`)!;
            const HEADER = (LIST_HEADER && LIST_HEADER.children.length > 0) ? 50 : 0;

            const MARGIN = 50;
            const PADDING = 50;
            height = (Screen.WINDOW_HEIGHT - TOOLBAR - PAGE_HEADER - MARGIN - HEADER - PADDING) + 'px';
        }

        return height;
    }


    ngAfterViewInit() {
        Tools.Sleep().then(() => {
            this._enableAnimations = true; 
        });
    }


    /** */
    protected _GetDisplay = (item: any): string => {
        return Tools.IsNotNull(item) ? item[this.propDisplay()] : '';
    }


    /** */
    protected _GetIndexRow = (item: any): number => {
        return item['index'];
    }


    /** */
    protected _GetTemplate(item: any): string {  
        return this.template()!(item, item.index);
    }


    /** */
    protected _showBackButton = (): boolean => {        
        return this.showBackButton()
            && !this.isLoading() 
    }


    /** */
    protected _showDeleteButtonByRow = (item: any): boolean => { 
        const showButton = this.showDeleteButtonByRow() as any;        
        return (typeof showButton === 'boolean')
            ? showButton && !this.isLoading()
            : showButton(item, item.index) === true && !this.isLoading(); 
    }


    /** */
    protected _showGoButtonByRow = (item: any): boolean => { 
        const showButton = this.showGoButtonByRow() as any;        
        return (typeof showButton === 'boolean')
            ? showButton && !this.isLoading()
            : showButton(item, item.index) === true && !this.isLoading(); 
    }


    /** */
    protected _Drop(event: CdkDragDrop<T[]>): void {
        const { previousIndex, currentIndex } = event;        
        let dataSource = Tools.BreakReference(this.dataSource());
        const item = Tools.BreakReference(dataSource[previousIndex]);
        dataSource.splice(previousIndex, 1);
        dataSource.splice(currentIndex, 0, item); 
        this.onSort.emit(dataSource);
        this.onDrop.emit(item);
    }
}