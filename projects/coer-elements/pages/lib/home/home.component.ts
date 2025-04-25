import { Component } from '@angular/core'; 
import { Page } from 'coer-elements/tools';   


@Component({
    selector: 'home-page',
    templateUrl: './home.component.html', 
    styleUrl: './home.component.scss',
    standalone: false
})
export class HomePage extends Page {   
  
 
    constructor() { 
        super('home');          
    }
}