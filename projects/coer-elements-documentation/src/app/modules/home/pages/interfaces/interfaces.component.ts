import { Component, inject, signal, viewChild, viewChildren } from '@angular/core'; 
import { CoerAccordion, CoerTab } from 'coer-elements/components';
import { Page, Tools } from 'coer-elements/tools';   
import { HttpClient } from '@angular/common/http';
import { IInterface } from '@Interfaces';

@Component({
    selector: 'interfaces-page',
    templateUrl: './interfaces.component.html',
    styleUrl: './interfaces.component.scss', 
    standalone: false
})
export class InterfacesPage extends Page {   
    
    //Elements
    protected coerAccordionList = viewChildren(CoerAccordion);

    //Injections
    private readonly _http = inject(HttpClient);
    private readonly _scope = 'coer-elements/interfaces';

    //Elements
    protected coerTab = viewChild.required<CoerTab>('coerTab');
        
    //Variables
    protected _interfaces = signal<IInterface[]>([]);   

    constructor() { 
        super('Interfaces'); 
    }   


    //getter
    protected get _tabList() {
        return Tools.IsOnlyWhiteSpace(this.pageResponse)
            ? Tools.Distinct(this._interfaces().map(x => x.tab))
            : Tools.Distinct(this._interfaces().filter(x => x.name == this.pageResponse).map(x => x.tab));
    }


    /** */
    protected override async RunPage() {  
        await this.GetGenericInterfaces(); 
        await this.GetByFileboxComponent();
        await this.GetByGridComponent();
        await this.GetByMenu();
        await this.GetByPageTitleComponent();
        await this.GetByServiceClass(); 
        await this.GetByLogin();
        await this.GetByColors();
        this.GetPageResponse();  
    }  


    /** */
    private GetGenericInterfaces = () => this.SetInterface('Generic', [
        'app-source.interface.ts',
        'box-button.interface.ts',
        'bulk-load.interface.ts',
        'coer-ref.interface.ts',
        'option.interface.ts',
        'screen-size.interface.ts',
    ]);  
    
    
    /** */
    private GetByFileboxComponent = () => this.SetInterface('CoerFilebox', [
        'coer-filebox/file-image.interface.ts',
        'coer-filebox/file.interface.ts', 
    ]);


    /** */
    private  GetByGridComponent = () => this.SetInterface('CoerGrid', [
        'coer-grid/grid-button-by-row.interface.ts',
        'coer-grid/grid-checkbox.interface.ts',
        'coer-grid/grid-coer-numberbox.interface.ts', 
        'coer-grid/grid-coer-selectbox.interface.ts',
        'coer-grid/grid-coer-switch.interface.ts',
        'coer-grid/grid-coer-textbox.interface.ts',
        'coer-grid/grid-column.interface.ts',
        'coer-grid/grid-data-source.interface.ts',
        'coer-grid/grid-header-button.interface.ts',
        'coer-grid/grid-header-export-button.interface.ts',
        'coer-grid/grid-header-import-button.interface.ts',
        'coer-grid/grid-header.interface.ts',
        'coer-grid/grid-import.interface.ts',
        'coer-grid/grid-input-checkbox.interface.ts', 
        'coer-grid/grid-input.interface.ts',
        'coer-grid/grid-item.interface.ts',
        'coer-grid/grid-keyup-enter.interface.ts',
        'coer-grid/grid-length.interface.ts',
        'coer-grid/grid-search.interface.ts',
        'coer-grid/grid-sort.interface.ts', 
    ]);
    

    /** */
    private GetByMenu = () => this.SetInterface('Menu', [
        'coer-menu/menu-access.interface.ts',
        'coer-menu/menu-option-selected.interface.ts',
        'coer-menu/menu-selected.interface.ts',
        'coer-menu/menu-toolbar.interface.ts', 
        'coer-menu/menu.interface.ts'
    ]); 
    

    /** */
    private GetByPageTitleComponent = () => this.SetInterface('CoerPageTitle', [
        'page-title/breadcrumb.interface.ts',
        'page-title/go-back.interface.ts',
        'page-title/information.interface.ts' 
    ]);   


    /** */
    private GetByServiceClass = () => this.SetInterface('Service', [
        'service/http-request.interface.ts',
        'service/http-response.interface.ts',
        'service/patch.interface.ts' 
    ]);  


    /** */
    private GetByLogin = () => this.SetInterface('Login', [
        'login/login.interface.ts',
        'login/user-login-response.interface.ts',
        'login/user-login.interface.ts' 
    ]); 


    /** */
    private GetByColors = () => this.SetInterface('Colors', [
        'colors/action-colors.interface.ts',
        'colors/app-colors.interface.ts',
        'colors/colors.interface.ts',
        'colors/fixed-colors.interface.ts' 
    ]); 

    
    /** */
    private GetContentFile = (path: string) => new Promise<string>(Resolve => {  
        if(Tools.IsOnlyWhiteSpace(path)) {
            return Resolve('');
        }

        if (!path.endsWith('.ts')) {
            path += '.ts';
        }
         
        const subscription = this._http.get(`${this._scope}/${path}`, { responseType: 'text' }).subscribe({
            next: (data: string) => Resolve(data),
            error: () => Resolve(''),
            complete: () => { subscription.unsubscribe() }
        });
    });  


    /** */
    private async SetInterface(tab: string, filePaths: string[]) {
        let name!: string;
        let content!: string;
        for(const path of filePaths) {
            content = await this.GetContentFile(path) || '';

            if (Tools.IsNotOnlyWhiteSpace(content)) {
                name = content.substring(content.indexOf('export interface')); 
                name = name.substring(0, name.indexOf('{')); 
                name = Tools.CleanUpBlanks(name);    
                name = name.replace('export interface', '');
                name = name.trim(); 

                this._interfaces.update(x => x.concat([{ tab, name, content }]));
            }   
        } 
    }


    /** */
    protected GetInterfaces = (tab: string): IInterface[] => {
        return Tools.IsOnlyWhiteSpace(this.pageResponse) 
            ? this._interfaces().filter(x => x.tab === tab)
            : this._interfaces().filter(x => x.name === this.pageResponse);
    }


    /** */
    protected Open(accordion: string) { 
        for(const component of this.coerAccordionList()) {
            if(component.title() != accordion) {
                component.Close();
            }  
        }
    }


    /** */
    private async GetPageResponse() {
        if (Tools.IsNotOnlyWhiteSpace(this.pageResponse)) {
            this.SetPageName(this.pageResponse); 
              
            if(this.coerAccordionList().length > 0) {
                await Tools.Sleep(500);
                this.coerAccordionList()[0].Open();
                this.coerAccordionList()[0].Disable();
            }  
        }
    }
} 