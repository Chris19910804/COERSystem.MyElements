import { Component } from '@angular/core'; 
import { IDocumentation } from '@Interfaces';
import { Page } from 'coer-elements/tools';    

@Component({
    selector: 'breadcrumbs-page',
    templateUrl: './breadcrumbs.component.html', 
    standalone: false
})
export class BreadcrumbsPage extends Page {   

    //Variables 
    protected functions: IDocumentation[] = [];

    constructor() { 
        super('Breadcrumbs') 
    }    


    /** */
    protected override RunPage() {
        this.GetFunctions();
    }   


    /** */
    private GetFunctions() {
        this.functions = [
            
        ];
    }
     
}