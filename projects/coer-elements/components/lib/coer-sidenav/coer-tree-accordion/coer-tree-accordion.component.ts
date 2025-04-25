import { Component, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IMenu, IMenuSelected, IMenuOptionSelected } from 'coer-elements/interfaces';
import { MatExpansionPanel } from '@angular/material/expansion'; 
import { menuSelectedSIGNAL } from 'coer-elements/signals';
import { Source, Tools } from 'coer-elements/tools'; 

@Component({
  selector: 'coer-tree-accordion',
  templateUrl: './coer-tree-accordion.component.html',
  styleUrl: './coer-tree-accordion.component.scss',
  standalone: false
})
export class CoerTreeAccordion { 

    @ViewChild('expansionPanel') expansionPanel!: MatExpansionPanel;
    @ViewChildren(CoerTreeAccordion) menuList!: QueryList<CoerTreeAccordion>;

    //Variables
    public isExpanded: boolean = false;
    public isCollapsed: boolean = true;

    //Inputs
    @Input() level: number = 1;
    @Input() item!: IMenu;
    @Input() tree: IMenu[] = [];
    @Input() showTree: boolean = true;

    //Outputs
    @Output() showGridMenu = new EventEmitter<IMenuOptionSelected>();
    @Output() clickMenuOption = new EventEmitter<IMenuOptionSelected>();
    @Output() clickMenu = new EventEmitter<IMenuSelected>();

    protected get _tree(): IMenu[] {
        return [...this.tree].concat([{...this.item}]);
    }

    protected get _icon(): string {
        return (this.item && Tools.IsNotOnlyWhiteSpace(this.item?.icon) && this.item.icon!.length > 0)
            ? this.item.icon! : 'fa-solid fa-bars';
    }


    protected get marginLeft(): string {
        return `${(this.level - 1) * 20}px`;
    }


    protected get identityClass(): string {
        let identity: string = '';

        for(let i = 0; i < this.tree.length; i++) {
            identity += `lv${i + 1}${this.tree[i].label}-`;
        }

        identity += `lv${this.level}${this.item.label}`;
        if(identity.includes(' ')) identity = identity.replaceAll(' ', '');
        return identity.toLowerCase();
    }


    /** */
    protected IsActive = (element: Element): boolean => {
        return (this.isExpanded && this.level > 1)
            || (this.isCollapsed && element.classList.contains('active-link'))
    }


    /** */
    protected IsMenu = (item: IMenu): boolean => Tools.IsNotNull(item) && Tools.IsNotOnlyWhiteSpace(item?.items);


    /** */
    protected IsGrid = (item: IMenu): boolean => Tools.IsNotNull(item) && Tools.IsNotOnlyWhiteSpace(item?.show) && item.show === 'GRID';


    /** */
    protected GetGridIcon = (icon: string | null | undefined): string => Tools.IsNotOnlyWhiteSpace(icon) ? icon! : 'fa-solid fa-grip';
         

    /** */
    public Close(): void {
        if(this.isExpanded) {
            this.isExpanded = false;
            this.isCollapsed = true;
            this.expansionPanel.close();
        }
    }


    /** */
    public Open(): void {
        if(this.isCollapsed) {
            this.isExpanded = true;
            this.isCollapsed = false;
            this.expansionPanel.open();
        }
    }


    /** */
    protected Toggle(): void {
        if(this.showTree) {
            this.isExpanded = !this.isExpanded;
            this.isCollapsed = !this.isCollapsed; 
        }

        else {
            this.isExpanded = true;
            this.isCollapsed = false;
            Source.Reset();
        }

        this.clickMenu.emit({
            level: this.level,
            label: this.item.label,
            isExpanded: this.isExpanded,
            isCollapsed: this.isCollapsed,
            items: this.item.items,
            icon: this._icon,
            tree: [...this._tree]
        });
    }


    /** */
    protected ClickMenuOption(menuOption: IMenuOptionSelected, showGridMenu: boolean = false): void {
        for(const menu of this.menuList.toArray()) {
            if(menu.item.label != menuOption.tree[this.level].label) {
                menu.Close();
            }
        }
         
        if(showGridMenu) this.showGridMenu.emit(menuOption);
        else this.clickMenuOption.emit(menuOption);
    }


    /** */
    protected ClickMenu(menu: IMenuSelected): void {
        for(const menuLv2 of this.menuList.toArray()) {
            if (menuLv2.item.label != menu.label) menuLv2.Close();
        }

        this.clickMenu.emit(menu);
    }


    /** */
    protected ShowGridMenu(menuOption: IMenuOptionSelected, menu: IMenu) {      
        menuSelectedSIGNAL.set({
            level: this.level + 1,
            label: menu.label,
            icon: this.GetGridIcon(menu.label),
            isExpanded: true,
            isCollapsed: false,
            items: menu.items,
            tree: []
        }); 
 
        this.ClickMenuOption(menuOption, true); 
    }
}