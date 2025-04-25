import { DOCUMENTATION } from 'projects/coer-elements-documentation/src/app/shared/components/documentation/documentation.component'; 
import { Component } from '@angular/core'; 
import { Page } from 'coer-elements/tools';
import { IDocEvent, IDocFunction, IDocInput, IDocProperty } from '@Interfaces'; 
import { CoerDropdown } from 'coer-elements/components';

@Component({
    selector: 'coer-dropdown-page',
    templateUrl: './coer-dropdown.component.html',
    standalone: false
})
export class CoerDropdownPage extends Page { 
     
    protected readonly component = CoerDropdown;

    //Variables
    protected inputs:     IDocInput[] = [];
    protected events:     IDocEvent[] = [];
    protected functions:  IDocFunction[] = [];
    protected properties: IDocProperty[] = [];
    protected quickImplement: string = '';

    constructor() { 
        super('coer-dropdown');          
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
                types: [{ name: "T | null", description: null }],
                component: 'Several'
            },
            { 
                input: 'label',
                default: '',
                types: [{ name: "string", description: null }],
                component: 'TextBox'
            },
            { 
                input: 'color', 
                default: "'default'", 
                types: [
                    { name: "'default'",    description: 'Without color' },
                    { name: "'primary'",    description: 'Blue'          },
                    { name: "'secondary'",  description: 'Gray '         },
                    { name: "'success'",    description: 'Green'         },
                    { name: "'warning'",    description: 'Yellow'        },
                    { name: "'danger'",     description: 'Red'           },
                    { name: "'navigation'", description: 'Orange'        },
                    { name: "'dark'",       description: 'Black'         }
                ],
                component: 'Dropdown'
            },
            { 
                input: 'type', 
                default: "'filled'", 
                types: [
                    { name: "'filled'",  description: 'The button is shown filled in'                               },
                    { name: "'outline'", description: 'Removes the fill color from the button and shows the border' }
                ],
                component: 'Dropdown'
            },
            { 
                input: 'dataSource',
                default: '',
                types: [{ name: "T[]", description: null }],
                component: 'Several'
            },
            { 
                input: 'propDisplay', 
                default: "'name'",
                types: [{ name: "string", description: null }],
                component: 'TextBox'
            },
            { 
                input: 'rowsByPage', 
                default: "50",
                types: [{ name: "number", description: null }],
                component: 'NumberBox'
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
                default: "'190px'", 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'minWidth', 
                default: "'150px'", 
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
            { 
                input: 'tooltip', 
                default: '',
                types: [{ name: 'string', description: null }],
                component: 'TextBox'
            },
            { 
                input: 'tooltipPosition', 
                default: "'left'", 
                types: [
                    { name: "'top'",    description: null }, 
                    { name: "'right'",  description: null }, 
                    { name: "'bottom'", description: null }, 
                    { name: "'left'",   description: null }
                ],
                component: 'Dropdown'
            }, 
        ];
    }


    /** */
    private GetEvents() {
        this.events = [
            { event: 'onSelected', emits: 'T',    description: null },
            { event: 'onUnselect', emits: 'null', description: null }  
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
                function: 'SetValueBy()', 
                return: 'void', 
                description: null,
                params: [{ param: 'callback', type: '(row: T) => boolean', description: null }]
            },
            { 
                function: 'Unselect()', 
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
                property: 'value',
                default: '',  
                description: null,
                types: [{ type: 'T | null', typeProp: 'getter', description: 'Value of component' }]
            },
        ];
    }


    /** */
    private GetQuickImplement() {
        this.quickImplement = 
`<coer-dropdown
    label=""
    color="" 
    [dataSource]="[]"
    [isLoading]="false"
    [isDisabled]="false"
    [isReadonly]="false"
    [isInvisible]="false" 
></coer-dropdown>`       
    }
}