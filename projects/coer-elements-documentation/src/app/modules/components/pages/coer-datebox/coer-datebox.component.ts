import { DOCUMENTATION } from 'projects/coer-elements-documentation/src/app/shared/components/documentation/documentation.component';
import { Component } from '@angular/core'; 
import { Page } from 'coer-elements/tools'; 
import { IDocEvent, IDocFunction, IDocInput, IDocProperty } from '@Interfaces'; 

@Component({
    selector: 'coer-datebox-page',
    templateUrl: './coer-datebox.component.html', 
    standalone: false
})
export class CoerDateboxPage extends Page {  

    protected readonly component = CoerDateboxPage;

    //Variables
    protected inputs:     IDocInput[] = [];
    protected events:     IDocEvent[] = [];
    protected functions:  IDocFunction[] = [];
    protected properties: IDocProperty[] = [];
    protected quickImplement: string = '';

    constructor() { 
        super('coer-datebox') 
    }    


    /** */
    protected override async RunPage() {
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
                input: 'value',    
                default: '', 
                types: [
                    { name: "string", description: DOCUMENTATION.notDataBind },
                    { name: "null", description: DOCUMENTATION.notDataBind }
                ],
                component: 'TextBox'
            },
            { 
                input: 'label',  
                default: '', 
                types: [{ name: 'string', description: null }],
                component: 'TextBox'
            },
            { 
                input: 'placeholder',
                default: '',   
                types: [{ name: 'string', description: null }],
                component: 'TextBox'
            },
            { 
                input: 'textPosition', 
                default: "'left'",
                types: [
                    { name: "'left'", description: null   }, 
                    { name: "'center'", description: null }, 
                    { name: "'right'", description: null  },
                ],
                component: 'Dropdown'
            },
            { 
                input: 'isInvalid', 
                default: 'false',
                types: [{ name: "boolean", description: DOCUMENTATION.isInvalid }],
                component: 'Switch'
            },
            { 
                input: 'isValid', 
                default: 'false',
                types: [{ name: "boolean", description: DOCUMENTATION.isValid }],
                component: 'Switch'
            },
            { 
                input: 'isLoading', 
                default: 'false', 
                types: [{ name: 'boolean', description: DOCUMENTATION.isLoading }],
                component: 'Switch'
            },
            { 
                input: 'isDisabled', 
                default: 'false', 
                types: [{ name: 'boolean', description: DOCUMENTATION.isDisabled }],
                component: 'Switch'
            },
            { 
                input: 'isReadonly', 
                default: 'false', 
                types: [{ name: 'boolean', description: DOCUMENTATION.isReadonly }],
                component: 'Switch'
            },
            { 
                input: 'isInvisible', 
                default: 'false', 
                types: [{ name: 'boolean', description: DOCUMENTATION.isInvisible }],
                component: 'Switch'
            },
            { 
                input: 'width', 
                default: "'100%'", 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'minWidth', 
                default: "'190px'", 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'maxWidth', 
                default: "'100%'", 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'marginTop', 
                default: "'0px'", 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'marginRight', 
                default: "'0px'", 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'marginBottom', 
                default: "'0px'", 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'marginLeft', 
                default: "'0px'", 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
        ];
    }


    /** */
    private GetEvents() {
        this.events = [
            { event: 'onOpen',        emits: 'void',   description: 'When open the datepicker'  },
            { event: 'onClose',       emits: 'void',   description: 'When close the datepicker' },
            { event: 'onChangeValue', emits: 'string', description: 'Emits the value with format (yyyy-MM-dd HH:mm:ss 24h)' },   
        ];
    }


    /** */
    private GetFunctions() {
        this.functions = [
            { 
                function: 'Open()',     
                return: 'void', 
                description: 'Open the datepicker', 
                params: []      
            },
            { 
                function: 'Close()',    
                return: 'void', 
                description: 'Close the datepicker',  
                params: []    
            },
            { 
                function: 'Unselect()', 
                return: 'void', 
                description: 'Unselect value, sets null', 
                params: []
            },
        ];
    }


    /** */
    private GetProperties() {
        this.properties = [
            {
                property: 'value', 
                default: '',
                description: null,
                types: [{ type: 'string | null', typeProp: 'getter', description: 'Value of component' }]
            },
            {
                property: 'isOpen',
                default: '',   
                description: null,
                types: [{ type: 'boolean', typeProp: 'getter', description: 'Property to identify when datepicker is open' }]
            },
            {
                property: 'isClose', 
                default: '',  
                description: null,
                types: [{ type: 'boolean', typeProp: 'getter', description: 'Property to identify when datepicker is close' }]
            },
        ];
    }


    /** */
    private GetQuickImplement() {
        this.quickImplement = 
`<coer-datebox
    label="Datebox"  
    [isInvalid]="false" 
    [isLoading]="false"
    [isDisabled]="false"
    [isReadonly]="false"     
></coer-datebox>`       
    }
}