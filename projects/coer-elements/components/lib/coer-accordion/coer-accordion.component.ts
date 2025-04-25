import { AfterViewInit, Component, input, output, viewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Tools } from 'coer-elements/tools'

@Component({
    selector: 'coer-accordion',
    templateUrl: './coer-accordion.component.html',
    styleUrl: './coer-accordion.component.scss',
    standalone: false
})
export class CoerAccordion implements AfterViewInit {

    //Variables
    protected _id: string = Tools.GetGuid('coer-accordion');
    private _expansionPanel = viewChild<MatExpansionPanel>('coerAccordion');
    private _htmlElement!: HTMLElement 
    protected _isDisabled: boolean = false;

    //Inputs
    public id           = input<string>('');
    public title        = input<string>('');
    public icon         = input<string>('');
    public expanded     = input<boolean>(true); 
    public scrollOnOpen = input<boolean>(false); 

    //Outputs
    public onOpen = output<void>();
    public onClose = output<void>(); 


    //Generic Tools
    protected _IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;


    ngAfterViewInit() {
        Tools.Sleep().then(() => {
            this._htmlElement = document.getElementById(this._id)!;
        });
    }

    
    //getter
    public get isExpanded(): boolean {
        return Tools.IsNotNull(this._expansionPanel())
            ? this._expansionPanel()!.expanded
            : false;
    }

    
    //getter
    public get isCollapsed(): boolean {
        return Tools.IsNotNull(this._expansionPanel())
            ? !this._expansionPanel()!.expanded
            : true;
    }


    //getter
    public get isDisabled(): boolean {
        return this._isDisabled;
    }


    /** */
    public Open(): void {
        if(Tools.IsNotNull(this._expansionPanel())) {
            if(this.isCollapsed) {
                this._expansionPanel()?.open();
            }
            
            if(this.scrollOnOpen() && Tools.IsNotNull(this._htmlElement)) {
                Tools.Sleep().then(_ => this._htmlElement.scrollIntoView({ behavior: 'smooth' }));
            }

            this.onOpen.emit();
        }
    }


    /** */
    public Close(): void {
        if(Tools.IsNotNull(this._expansionPanel())) {
            if(this.isExpanded) {
                this._expansionPanel()?.close();
            }

            this.onClose.emit();
        }
    }  


    /** */
    public Enable(): void {
        this._isDisabled = false;
    }


    /** */
    public Disable(): void {
        this._isDisabled = true;
    }


    /** */
    public ScrollToAccordion(): void {
        if(Tools.IsNotNull(this._expansionPanel())) {
            Tools.Sleep().then(_ => this._htmlElement.scrollIntoView({ behavior: 'smooth' }));
        }
    } 
}