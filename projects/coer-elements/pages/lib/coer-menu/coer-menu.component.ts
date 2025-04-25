import { Component, computed, effect, WritableSignal } from '@angular/core'; 
import { Page, Tools } from 'coer-elements/tools';  
import { menuSelectedSIGNAL } from 'coer-elements/signals';
import { IMenu, IMenuSelected } from 'coer-elements/interfaces';


@Component({
    selector: 'coer-menu-page',
    templateUrl: './coer-menu.component.html', 
    styleUrl: './coer-menu.component.scss',
    standalone: false
})
export class CoerMenuPage extends Page { 
     
    //signals
    protected menu: WritableSignal<IMenuSelected | null> = menuSelectedSIGNAL;

    constructor() { 
        super('coer-menu'); 
        
        effect(() => {
            const menu = menuSelectedSIGNAL();
            if(Tools.IsNotNull(menu)) this.SetPageFilters({ menu }); 
        });
    }    


    //computed
    protected _gridMenu = computed<IMenu[]>(() => { 
        let id: number = 0;
        return this.menu()?.items?.map(item => Object.assign(item, { id: ++id })) || [];
    });


    /** */
    protected override RunPage() {
        if (Tools.IsNotNull(this.pageFilters) && Tools.IsNotNull(this.pageFilters.menu)) { 
            menuSelectedSIGNAL.set(this.pageFilters.menu); 
            this.SetPageName(this.pageFilters.menu.label);
        } 
    }       


    /** */
    protected _isPage = (item: IMenu): boolean => Tools.IsNotOnlyWhiteSpace(item?.path) && Tools.IsNull(item?.items);


    /** */
    protected _getPath = (item: IMenu): string | null => (this._isPage(item) && item.path!.length > 0) ? item.path! : null;     
}