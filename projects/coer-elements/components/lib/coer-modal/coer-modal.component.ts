import { AfterViewInit, Component, computed, ContentChildren, input, output, WritableSignal } from '@angular/core';
import { ICoerRef, IScreenSize } from 'coer-elements/interfaces';
import { CoerRefDirective } from 'coer-elements/directives';
import { isModalOpenSIGNAL } from 'coer-elements/signals';
import { ElementsHTML, Screen, Tools } from 'coer-elements/tools';
import { Modal } from 'bootstrap';


@Component({
    selector: 'coer-modal',
    templateUrl: './coer-modal.component.html',
    styleUrl: './coer-modal.component.scss',
    standalone: false
})
export class CoerModal implements AfterViewInit { 

    @ContentChildren(CoerRefDirective) contentRef!: any;

    //Variables
    protected _id: string = Tools.GetGuid('coer-modal');
    protected _isOpen: boolean = false;
    protected _modal!: Modal;
    protected _isModalOpen: WritableSignal<boolean> = isModalOpenSIGNAL;
    protected _windowWidth: number = Screen.WINDOW_WIDTH;

    //Inputs 
    public id              = input<string>('');
    public title           = input<string>('');
    public icon            = input<string>('');
    public showCloseButton = input<boolean>(true);
    public width           = input<'small' | 'full' | 'auto'>('small');
    public height          = input<string>('auto');
    public maxHeight       = input<string>('');

    //getter
    public get isOpen(): boolean {
        return this._isOpen;
    }

    //getter
    public get isClose(): boolean {
        return !this._isOpen;
    }

    //getter
    protected get _width(): string { 
        switch(this.width()) {
            case 'small': return '450px';
            case 'full': return `${this._windowWidth - 50}px`;
            case 'auto': return 'fit-content';
            default: return this.width();
        }
    }

    //Computed
    protected _contentList = computed<ICoerRef[]>(() => Array.from(this.contentRef._results));

    //Computed
    protected _header = computed<ICoerRef | null>(() => {
        const header = this._contentList().find(x => x.coerRef() === 'header');
        return Tools.IsNotNull(header) ? header! : null;
    });

    //Computed
    protected _body = computed<ICoerRef | null>(() => {
        const body = this._contentList().find(x => x.coerRef() === '' || x.coerRef() === 'body');
        return Tools.IsNotNull(body) ? body! : null;
    });

    //Computed
    protected _footer = computed<ICoerRef | null>(() => {
        const footer = this._contentList().find(x => x.coerRef() === 'footer');
        return Tools.IsNotNull(footer) ? footer! : null;
    });

    //Computed
    protected _title = computed<string>(() => {
        return Tools.IsNotNull(this._header()) && this._header()!.title().length > 0
            ? this._header()!.title() : this.title();
    });

    //Computed
    protected _icon = computed<string>(() => {
        return Tools.IsNotNull(this._header()) && this._header()!.icon().length > 0
            ? this._header()!.icon() : this.icon();
    });

    //Outputs
    public onOpen = output<void>();
    public onClose = output<void>();

    //Generic Tools
    protected IsNull = Tools.IsNull;
    protected IsNotNull = Tools.IsNotNull;

    async ngAfterViewInit() {
        await Tools.Sleep();
        this._modal = new Modal(document.getElementById(this._id)!);

        Screen.Resize.subscribe((response: IScreenSize) => {
            this._windowWidth = response.width;
        }); 
    }


    /** */
    public Open(): void {
        this._modal.show();

        if(!this._isOpen) {
            this._isOpen = true;
            this._isModalOpen.set(true);
            Tools.Sleep(1000).then(() => this.onOpen.emit());
        }
    }


    /** */
    public Close(): void {
        this._modal.hide();

        if(this._isOpen) {
            ElementsHTML.GetElement(`#${this._id}-button-close`)?.blur(); 

            this._isOpen = false;
            this._isModalOpen.set(false);
            Tools.Sleep(1000).then(() => this.onClose.emit());
        }
    }
}