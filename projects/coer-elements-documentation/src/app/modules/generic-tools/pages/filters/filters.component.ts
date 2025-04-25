import { Component } from '@angular/core'; 
import { Page } from 'coer-elements/tools';   
import { IDocumentation } from '@Interfaces';

@Component({
    selector: 'filters-page',
    templateUrl: './filters.component.html', 
    standalone: false
})
export class FiltersPage extends Page {   

    //Variables 
    protected functions: IDocumentation[] = [];

    constructor() { 
        super('Filters') 
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