import { Component } from '@angular/core'; 
import { Page } from 'coer-elements/tools';   
import { IDocumentation } from '@Interfaces';

@Component({
    selector: 'service-page',
    templateUrl: './service.component.html', 
    standalone: false
})
export class ServicePage extends Page {   

    //Variables 
    protected functions: IDocumentation[] = [];

    constructor() { 
        super('Service') 
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