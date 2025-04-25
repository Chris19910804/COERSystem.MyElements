import { Component } from '@angular/core'; 
import { Page } from 'coer-elements/tools'; 
import { IDocEvent, IDocFunction, IDocInput, IDocProperty, IDocumentation } from '@Interfaces';
import { CoerPageTitle } from 'coer-elements/components';

@Component({
    selector: 'coer-page-title-page',
    templateUrl: './coer-page-title.component.html', 
    standalone: false
})
export class CoerPageTitlePage extends Page {   

    protected readonly component = CoerPageTitle;

    //Variables
    protected inputs:     IDocInput[] = [];
    protected events:     IDocEvent[] = [];
    protected functions:  IDocFunction[] = [];
    protected properties: IDocProperty[] = [];
    protected quickImplement: string = '';

    constructor() { 
        super('coer-page-title') 
    }    


    /** */
    protected override RunPage() {
        this.GetInputs();
        this.GetEvents(); 
        this.GetFunctions();
        this.GetProperties();
        this.GetQuickImplement();
    }      


    /** */
    private GetInputs() {
        this.inputs = [
            { 
                input: 'title', 
                default: '', 
                types: [
                    { name: 'string', description: null }, 
                    { name: 'null', description: null }
                ],
                component: 'TextBox' 
            },
            { 
                input: 'showBreadcrumbs', 
                default: 'true', 
                types: [{ name: 'boolean', description: null }],
                component: 'Switch' 
            },
            { 
                input: 'breadcrumbs', 
                default: '[]', 
                types: [{ name: 'IBreadcrumb[]', description: null }],
                component: 'Several'
            },
            { 
                input: 'goBack', 
                default: '{ show: false }', 
                types: [{ name: 'IGoBack', description: null }],
                component: 'Several'
            },
            { 
                input: 'information', 
                default: '{ show: false }', 
                types: [{ name: 'IInformation', description: null }],
                component: 'Several'
            },
        ];
    }


    /** */
    private GetEvents() {
        this.events = [
            { event: 'onClickInformation', emits: 'void', description: null }
        ];
    }


    /** */
    private GetFunctions() {
        this.functions = [];
    }


    /** */
    private GetProperties() {
        this.properties = [];
    }


    /** */
    private GetQuickImplement() {
        this.quickImplement = 
`<coer-page-title
    title=""
    [breadcrumbs]="breadcrumbs"
    [goBack]="goBack" 
></coer-page-title> `       
    }
}