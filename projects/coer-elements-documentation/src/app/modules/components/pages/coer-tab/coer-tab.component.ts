import { DOCUMENTATION } from 'projects/coer-elements-documentation/src/app/shared/components/documentation/documentation.component';
import { IDocEvent, IDocFunction, IDocInput, IDocProperty } from '@Interfaces';
import { Component } from '@angular/core'; 
import { Page } from 'coer-elements/tools';  
import { CoerTab } from 'coer-elements/components';

@Component({
    selector: 'coer-tab-page',
    templateUrl: './coer-tab.component.html', 
    standalone: false
})
export class CoerTabPage extends Page {

    protected readonly component = CoerTab;

    //Variables
    protected inputs:     IDocInput[] = [];
    protected events:     IDocEvent[] = [];
    protected functions:  IDocFunction[] = [];
    protected properties: IDocProperty[] = [];
    protected quickImplement: string = '';

    constructor() { 
        super('coer-tab') 
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
                input: 'selectedIndex', 
                default: '0', 
                types: [{ name: 'number', description: null }],
                component: 'NumberBox'
            },
            { 
                input: 'alignTabs', 
                default: "'start'", 
                types: [
                    { name: "'start'", description: null }, 
                    { name: "'center'", description: null }, 
                    { name: "'end'", description: null }
                ],
                component: 'Dropdown'
            },
            { 
                input: 'height', 
                default: "'auto'", 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'minHeight', 
                default: "'300px'", 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'maxHeight', 
                default: "'auto'", 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
        ];
    }


    /** */
    private GetEvents() {
        this.events = [
            { event: 'onSelectedTab', emits: 'ICoerRef', description: null },
        ];
    }


    /** */
    private GetFunctions() {
        this.functions = [
            { 
                function: 'SelectTabBy()', 
                return: 'void',
                description: null,
                params: [{ param: 'callback', type: '(tab: ICoerRef) => boolean', description: null }]
            },
        ];
    }


    /** */
    private GetProperties() {
        this.properties = [
            { 
                property: 'selectedTab', 
                default: '',
                description: null,
                types: [{ type: 'ICoerRef', typeProp: 'computed', description: null }] 
            },
        ];
    }


    /** */
    private GetQuickImplement() {
        this.quickImplement = 
`<section class="coer-container-tab">
    <coer-tab minHeight="350px" (onSelectedTab)="null">
        <ng-template coerRef="Option 1">
    
        </ng-template>
    </coer-tab>
</section>`       
    }
}