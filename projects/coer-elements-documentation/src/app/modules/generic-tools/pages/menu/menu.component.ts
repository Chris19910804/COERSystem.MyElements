import { Component } from '@angular/core'; 
import { Page } from 'coer-elements/tools';   
import { IDocumentation } from '@Interfaces';

@Component({
    selector: 'menu-page',
    templateUrl: './menu.component.html', 
    standalone: false
})
export class MenuPage extends Page {   

    //Variables 
    protected functions: IDocumentation[] = [];

    constructor() { 
        super('Menu') 
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