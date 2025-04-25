import { DOCUMENTATION } from 'projects/coer-elements-documentation/src/app/shared/components/documentation/documentation.component'; 
import { IDocEvent, IDocFunction, IDocInput, IDocProperty } from '@Interfaces';
import { CoerModal } from 'coer-elements/components';
import { Component } from '@angular/core'; 
import { Page } from 'coer-elements/tools'; 

@Component({
    selector: 'coer-modal-page',
    templateUrl: './coer-modal.component.html', 
    standalone: false
})
export class CoerModalPage extends Page {   

    protected readonly component = CoerModal;
    
    //Variables
    protected inputs:     IDocInput[] = [];
    protected events:     IDocEvent[] = [];
    protected functions:  IDocFunction[] = [];
    protected properties: IDocProperty[] = [];
    protected quickImplement: string = '';


    constructor() { 
        super('coer-modal') 
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
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'showCloseButton', 
                default: 'true',
                types: [{ name: 'boolean', description: null }],
                component: 'Switch'
            },
            { 
                input: 'width', 
                default: "'small'", 
                types: [
                    { name: "'small'", description: null }, 
                    { name: "'full'", description: null }, 
                    { name: "'auto'", description: null }
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
                input: 'maxHeight',  
                default: '', 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
        ];
    }


    /** */
    private GetEvents() {
        this.events = [
            { event: 'onOpen',  emits: 'void', description:  null },
            { event: 'onClose', emits: 'void', description:  null }, 
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
        ];
    }


    /** */
    private GetProperties() {
        this.properties = [
            {
                property: 'isOpen', 
                default: 'false',
                description: null,
                types: [{ type: 'boolean', typeProp: 'getter', description: null }]
            },
            {
                property: 'isClose', 
                default: 'true',
                description: null,
                types: [{ type: 'boolean', typeProp: 'getter', description: null }]
            },
        ];
    }


    /** */
    private GetQuickImplement() {
        this.quickImplement = 
``       
    }
}