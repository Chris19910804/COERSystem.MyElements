import { Component } from '@angular/core'; 
import { Page } from 'coer-elements/tools';   
import { IDocumentation } from '@Interfaces';

@Component({
    selector: 'screen-page',
    templateUrl: './screen.component.html', 
    standalone: false
})
export class ScreenPage extends Page {   

    //Variables 
    protected functions: IDocumentation[] = [];

    constructor() { 
        super('Screen') 
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