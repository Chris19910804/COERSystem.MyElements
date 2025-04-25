import { DOCUMENTATION } from 'projects/coer-elements-documentation/src/app/shared/components/documentation/documentation.component';
import { CoerAccordion } from 'coer-elements/components';
import { IDocEvent, IDocFunction, IDocInput, IDocProperty, IDocumentation } from '@Interfaces';  
import { Component } from '@angular/core'; 
import { Page } from 'coer-elements/tools';  

@Component({
    selector: 'coer-accordion-page',
    templateUrl: './coer-accordion.component.html', 
    standalone: false
})
export class CoerAccordionPage extends Page { 
    
    protected readonly component = CoerAccordion;

    //Variables
    protected inputs:     IDocInput[] = [];
    protected events:     IDocEvent[] = [];
    protected functions:  IDocFunction[] = [];
    protected properties: IDocProperty[] = [];
    protected quickImplement: string = '';

    constructor() { 
        super('coer-accordion') 
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
                types: [{ name: 'string', description: null }],
                component: 'TextBox'
            },
            { 
                input: 'icon', 
                default: '', 
                types: [{ name: 'string', description: DOCUMENTATION.icons }],
                component: 'TextBox'
            },
            { 
                input: 'expanded', 
                default: 'true', 
                types: [{ name: 'boolean', description: 'Controls the component to open or close' }],
                component: 'Switch'
            },             
            { 
                input: 'scrollOnOpen', 
                default: 'false', 
                types: [{ name: 'boolean', description: 'Every time you open the accordion, it scrolls to the item' }],
                component: 'Switch'
            },
        ];
    }


    /** */
    private GetEvents() {
        this.events = [
            { event: 'onOpen',  emits: 'void', description: null },
            { event: 'onClose', emits: 'void', description: null },   
        ];
    }


    /** */
    private GetFunctions() {
        this.functions = [
            { 
                function: 'Open()', 
                return: 'void',
                description: null,
                params: [] 
            },
            { 
                function: 'Close()', 
                return: 'void',
                description: null,
                params: []
            },
            { 
                function: 'Enable()', 
                return: 'void',
                description: null,
                params: []
            },
            { 
                function: 'Disable()', 
                return: 'void',
                description: null,
                params: []
            },
            { 
                function: 'ScrollToAccordion()', 
                return: 'void',
                description: null,
                params: []
            },
        ];
    }


    /** */
    private GetProperties() {
        this.properties = [
            {
                property: 'isExpanded', 
                default: 'false',
                description: null,
                types: [{ type: 'boolean', typeProp: 'getter', description: 'Property to identify when the accordion is expanded' }]
            },
            {
                property: 'isCollapsed', 
                default: 'true', 
                description: null,
                types: [{ type: 'boolean', typeProp: 'getter', description: 'Property to identify when the accordion is collapsed' }]
            },
            {
                property: 'isDisabled', 
                default: 'false', 
                description: null,
                types: [{ type: 'boolean', typeProp: 'getter', description: 'Property to identify when the accordion is disabled' }]
            }
        ];        
    }


    /** */
    private GetQuickImplement() {
        this.quickImplement = 
`<section class='coer-container-accordion'>
    <coer-accordion title='My Accordion' icon='fa-solid fa-fire'>
        ...
    </coer-accordion>
</section>`       
    }
}