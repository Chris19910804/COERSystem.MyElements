import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core'; 
import { CoerButton } from 'coer-elements/components';
import { Page } from 'coer-elements/tools';    

@Component({
    selector: 'test-page',
    templateUrl: './test.component.html',
    styleUrl: './test.component.scss', 
    standalone: false
})
export class TestPage extends Page {    

    @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;
    protected _component!: ComponentRef<CoerButton>; 
    protected expanded: boolean = false; 
     
    constructor() { 
        super('Test'); 
    }     
    
    
    protected override async RunPage() {   
         
    };
} 