import { Component, WritableSignal, computed, inject, output, viewChild, viewChildren } from '@angular/core';
import { IMenu, IMenuSelected, IMenuOptionSelected, IScreenSize } from 'coer-elements/interfaces';
import { CoerTreeAccordion } from './coer-tree-accordion/coer-tree-accordion.component';
import { breakpointSIGNAL, isModalOpenSIGNAL, isMenuOpenSIGNAL, navigationSIGNAL, isLoadingSIGNAL, menuSelectedSIGNAL } from 'coer-elements/signals';
import { Tools, Breadcrumbs, Menu, Screen } from 'coer-elements/tools';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
    selector: 'coer-sidenav',
    templateUrl: './coer-sidenav.component.html',
    styleUrl: './coer-sidenav.component.scss',
    standalone: false
})
export class CoerSidenav {

    //Injections
    private _router = inject(Router);

    //signals
    protected isOpen: WritableSignal<boolean> = isMenuOpenSIGNAL;
    protected _isModalOpen: WritableSignal<boolean> = isModalOpenSIGNAL;
    protected _isLoading: WritableSignal<boolean> = isLoadingSIGNAL;

    //Elements
    protected sidenav = viewChild.required<MatDrawer>('matSidenav');
    protected menuList = viewChildren(CoerTreeAccordion); 
    
    //Outputs 
    public onMenuSelected = output<IMenuSelected>();

    //getter
    protected get backdrop(): boolean {
        return ['xs', 'sm', 'md'].includes(breakpointSIGNAL());
    }

    //getter
    protected get mode(): 'over' | 'push' {
        return ['xs', 'sm', 'md'].includes(breakpointSIGNAL()) ? 'over' : 'push';
    }

    //getter
    protected get showAsideMenu(): boolean {
        return ['xl', 'xxl'].includes(breakpointSIGNAL()) && !this.isOpen()
    }

    //computed
    public _navigation = computed<IMenu[]>(() => {
        let id: number = 0;
        const navigation = navigationSIGNAL();
        return navigation.map(item => Object.assign(item, { id: ++id })); 
    });

    constructor() {
        this.BackButtonBrowser(); 
        this.isOpen.set(false); 

        Screen.Resize.subscribe({
            next: ({ breakpoint }: IScreenSize) => {
                breakpointSIGNAL.set(breakpoint);
                if(this.backdrop) this.Close();
            }
        });
    } 


    /** */
    protected async NavigateTo(selectedOption: IMenuOptionSelected, showGridMenu: boolean = false) {
        let url = `${selectedOption.path}`;
        if (selectedOption.queryParams.length > 0) url += `?${selectedOption.queryParams}`;

        if (showGridMenu) {
            this._router.navigateByUrl('/loading');
            await Tools.Sleep();
        }

        this._router.navigateByUrl(url);
 
        //Set active link
        this.SetActiveLink(selectedOption);

        //Close Menu
        if(selectedOption.level == 1) {
            for(const menuLv1 of this.menuList()) {
                for(const menuLv2 of menuLv1.menuList.toArray()) {
                    menuLv2.Close();
                }
                menuLv1.Close();
            }
        } 
    } 


    /** */
    public SetActiveLink(selectedOption: IMenuOptionSelected | null): void {
        if (selectedOption) {
            selectedOption = Tools.BreakReference(selectedOption);
            Menu.SetSelectedOption(selectedOption);

            let collection: Element[] = [];
            collection = collection.concat(Array.from(document.querySelectorAll('mat-drawer-container span.icon-container')));
            collection = collection.concat(Array.from(document.querySelectorAll('mat-drawer-container span.label-container')));

            //Remove active-link
            for(const element of collection) {
                if(element.classList.contains('active-link')) {
                    element.classList.remove('active-link');
                }
            }

            //Add active-link
            const levels = selectedOption.tree.length;
            for(let i = 0; i < levels; i++) {
                for(const element of collection) {
                    const identityClass = this.GetIdentityClass(selectedOption.tree);
                    if (element.classList.contains(identityClass)) {
                        element.classList.add('active-link');
                    }
                }

                selectedOption.tree.pop();
            }
        }
    }


    /** */
    public Open(event: MouseEvent, item: IMenu | null = null): void {
        event.stopPropagation();

        if (!this.isOpen()) {
            this.isOpen.set(true);
            this.sidenav().open();
        }
    }


    /** */
    public Close(): void {
        if (this.isOpen()) {
            this.isOpen.set(false);
            this.sidenav().close();
        }
    }


    /** */
    public Toggle(): void {
        this.sidenav().toggle();
    }


    /** */
    protected MenuSelected(selectedMenu: IMenuSelected) {
        if (selectedMenu.level == 1) {
            for(const menuLv1 of this.menuList()) {
                if(menuLv1.item.label != selectedMenu.label) {

                    for(const menuLv2 of menuLv1.menuList.toArray()) {
                        menuLv2.Close();
                    }

                    menuLv1.Close();
                }
            }
        } 

        this.onMenuSelected.emit(menuSelectedSIGNAL()!);
    }


    /** */
    protected ShowGridMenu(menuOption: IMenuOptionSelected, menu: IMenu) {
        menuSelectedSIGNAL.set({
            level: 1,
            label: menu.label,
            icon: this._GetIcon(menu),
            isExpanded: true,
            isCollapsed: false,
            items: menu.items,
            tree: []
        }); 
         
        this.NavigateTo(menuOption, true); 
    }


    /** */
    protected _IsMenu = (item: IMenu): boolean => Tools.IsNotNull(item) && Tools.IsNotNull(item?.items);


    /** */
    protected _IsGrid = (item: IMenu): boolean => item?.show === 'GRID';
   

    /** */
    protected _GetIcon = (item: IMenu): string => {  
        return item?.icon 
            || (this._IsMenu(item) ? (this._IsGrid(item) ? 'fa-solid fa-grip' : 'fa-solid fa-bars') : '');
    }


    /** */
    protected SetIdentityClass = (label: String): string => {
        let identity = `lv1${label}`;
        if(identity.includes(' ')) identity = identity.replaceAll(' ', '');
        return identity.toLowerCase();
    }


    /** */
    private GetIdentityClass(tree: IMenu[]): string {
        let identity: string = '';

        for(let i = 0; i < tree.length; i++) {
            identity += `lv${i + 1}${tree[i].label}-`;
        }

        if(identity.endsWith('-')) identity = identity.slice(0, -1);
        if(identity.includes(' ')) identity = identity.replaceAll(' ', '');
        return identity.toLowerCase();
    }


    /** */
    private BackButtonBrowser() {
        const QUERY_SELECTOR = 'coer-menu-option[ng-reflect-path="[path]"] mat-nav-list.coer-menu-option';

        Screen.BackButtonBrowser.subscribe(toPath => {
            if (toPath.includes('/#/')) toPath = toPath.split('/#')[1];
            if (toPath.includes('?')) toPath = toPath.split('?')[0];

            //Validate path
            for (const module of navigationSIGNAL()) {
                if (module.items) for (const subModule of module.items) {
                    //Level Three
                    if (subModule.items) {
                        for(const item of subModule.items) if (item.path === toPath) {
                            (document.querySelector(QUERY_SELECTOR.replace('[path]', toPath)) as any)?.click();
                            return;
                        }
                    }

                    //Level Two
                    else if (subModule.path === toPath) {
                        (document.querySelector(QUERY_SELECTOR.replace('[path]', toPath)) as any)?.click();
                        return;
                    }
                }

                //Level One
                else if (module.path === toPath) {
                    (document.querySelector(QUERY_SELECTOR.replace('[path]', toPath)) as any)?.click();
                    return;
                }
            }

            Breadcrumbs.Remove(toPath);
        });
    }  
}