import { Component, ContentChildren, Input, input, output, viewChild, computed, OnDestroy, signal, AfterViewInit } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { CoerRefDirective } from 'coer-elements/directives';
import { Tools } from 'coer-elements/tools';
import { ICoerRef } from 'coer-elements/interfaces';
import { Tooltip } from 'bootstrap';

@Component({
    selector: 'coer-tab',
    templateUrl: './coer-tab.component.html',
    styleUrl: './coer-tab.component.scss',
    standalone: false
})
export class CoerTab implements AfterViewInit, OnDestroy { 

    @ContentChildren(CoerRefDirective) contentRef!: any;

    //Elements
    protected _matTabGroup = viewChild.required<MatTabGroup>('matTabGroup');

    //Variables
    protected _id: string = Tools.GetGuid('coer-tab');
    protected _selectedIndex = signal<number>(0);
    protected _htmlElement!: HTMLElement;
    protected _tooltipList: { id: string, tooltip?: Tooltip }[] = []; 

    //Inputs
    public height    = input<string>('auto');
    public minHeight = input<string>('300px');
    public maxHeight = input<string>('auto');

    @Input() set selectedIndex(value: number) {
        if (Tools.IsNotNull(value)) {
            this._selectedIndex.set(value);
        }
    }

    @Input() set alignTabs(value: 'start' | 'center' | 'end') {
        if(Tools.IsNotNull(this._htmlElement)) {
            if (Tools.IsNotNull(value)) {
                this._htmlElement.removeAttribute('mat-align-tabs');

                Tools.Sleep().then(() => {
                    this._htmlElement.setAttribute('mat-align-tabs', value);
                });
            }
        }

        else Tools.Sleep().then(() => this.alignTabs = value);
    }


    //Outputs
    public onSelectedTab = output<ICoerRef>();
     
    //getter
    protected get _contentList(): ICoerRef[] { 
        return Array.from(this.contentRef._results);
    }

    //getter
    public selectedTab = computed<ICoerRef>(() => {
        const index = this._selectedIndex();
        return this._contentList[index];
    }); 

    ngAfterViewInit() { 
        this._htmlElement = this._matTabGroup()._elementRef.nativeElement; 
    }

    ngOnDestroy() {
        for(const _tooltip of this._tooltipList) {
            _tooltip.tooltip?.dispose();
        }
    }

    /** */
    protected _SelectedIndexChange(selectedIndex: number) { 
        this._selectedIndex.set(selectedIndex);
        this.onSelectedTab.emit(this._contentList[selectedIndex]);
    }


    /** */
    protected _GetTitle(tab: ICoerRef): string {
        const ref = this._contentList.find(x => x.coerRef() == tab.coerRef())!;
        return (ref.title().length > 0) ? ref.title() : ref.coerRef();
    }


    /** */
    protected _GetIcon(tab: ICoerRef): string {
        return this._contentList.find(x => x.coerRef() == tab.coerRef())!.icon();
    }


    /** */
    public SelectTabBy(callback: (tab: ICoerRef) => boolean): void {
        const index = this._contentList.findIndex(callback as any);
        if(index >= 0) this._selectedIndex.set(index); 
    }


    /** */
    protected _SetToolTip(tab: ICoerRef): string {
        const id = `${this._id}-${tab.coerRef()}`;

        if (!this._tooltipList.some(x => x.id == id) && tab.tooltip().length > 0) {
            this._tooltipList.push({ id });

            Tools.Sleep().then(() => {
                const htmlElement = document.getElementById(id)!;

                if (htmlElement) {
                    const tooltip = new Tooltip(htmlElement, {
                        html: true,
                        title: tab.tooltip(),
                        placement: 'top'
                    });

                    htmlElement.addEventListener('mouseleave', () => {
                        if (htmlElement) tooltip.hide();
                    });

                    const index = this._tooltipList.findIndex(x => x.id == id);
                    if (index >= 0) this._tooltipList[index].tooltip = tooltip;
                }
            });
        }

        return id;
    }


    /** */
    protected _RemoveTooltip(element: HTMLElement): void {
        const id = element.getAttribute('id');
        const index = this._tooltipList.findIndex(x => x.id == id);
        if (index >= 0) this._tooltipList.splice(index, 1);
    } 
}