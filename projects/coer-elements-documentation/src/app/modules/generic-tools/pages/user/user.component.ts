import { Component } from '@angular/core'; 
import { Page } from 'coer-elements/tools';   
import { IDocumentation } from '@Interfaces';

@Component({
    selector: 'user-page',
    templateUrl: './user.component.html', 
    standalone: false
})
export class UserPage extends Page {   

    //Variables 
    protected functions: IDocumentation[] = [];

    constructor() { 
        super('User') 
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