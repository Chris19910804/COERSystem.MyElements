import { DOCUMENTATION } from 'projects/coer-elements-documentation/src/app/shared/components/documentation/documentation.component';
import { Component } from '@angular/core';  
import { Page } from 'coer-elements/tools'; 
import { IDocEvent, IDocFunction, IDocInput, IDocProperty, IDocumentation } from '@Interfaces';  
import { CoerSelectbox } from 'coer-elements/components';

@Component({
    selector: 'coer-selectbox-page',
    templateUrl: './coer-selectbox.component.html', 
    standalone: false
})
export class CoerSelectboxPage extends Page { 

    protected readonly component = CoerSelectbox;

    //Variables
    protected inputs:     IDocInput[] = [];
    protected events:     IDocEvent[] = [];
    protected functions:  IDocFunction[] = [];
    protected properties: IDocProperty[] = [];
    protected quickImplement: string = '';

    constructor() { 
        super('coer-selectbox'); 
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
                    { name: "T", description: DOCUMENTATION.notDataBind },
                    { name: "null", description: DOCUMENTATION.notDataBind }
                ],
                component: 'Several'
            },
            { 
                input: 'label',
                default: '',
                types: [{ name: "string", description: null }],
                component: 'TextBox' 
            },
            { 
                input: 'placeholder', 
                default: "'-- Select --'",
                types: [{ name: "string", description: null }],
                component: 'TextBox'
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
                input: 'dataSource', 
                default: '[]',
                types: [{ name: "T[]", description: null }],
                component: 'Several'
            },
            { 
                input: 'displayProperty', 
                default: "'name'",
                types: [{ name: "string", description: null }],
                component: 'TextBox'
            },
            { 
                input: 'rowsByPage', 
                default: '50',
                types: [{ name: "number", description: null }],
                component: 'NumberBox' 
            },
            { 
                input: 'isLoading', 
                default: 'false', 
                types: [{ name: "boolean", description: DOCUMENTATION.isLoading }],
                component: 'Switch'
            },
            { 
                input: 'isDisabled', default: 'false', 
                types: [{ name: "boolean", description: DOCUMENTATION.isDisabled }],
                component: 'Switch'
            },
            { 
                input: 'isReadonly', 
                default: 'false', 
                types: [{ name: "boolean", description: DOCUMENTATION.isReadonly }],
                component: 'Switch'
            },
            { 
                input: 'isInvisible', 
                default: 'false', 
                types: [{ name: "boolean", description: DOCUMENTATION.isInvisible }],
                component: 'Switch'
            },
            { 
                input: 'width', 
                default: "'100%'",
                types: [{ name: "string", description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'minWidth', 
                default: "'190px'",
                types: [{ name: "string", description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox' 
            },
            { 
                input: 'maxWidth', 
                default: "'100%'",
                types: [{ name: "string", description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox' 
            },
            { 
                input: 'marginTop', 
                default: "'0px'",
                types: [{ name: "string", description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox' 
            },
            { 
                input: 'marginRight', 
                default: "'0px'",
                types: [{ name: "string", description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox' 
            },
            { 
                input: 'marginBottom', 
                default: "'0px'",
                types: [{ name: "string", description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox' 
            },
            { 
                input: 'marginLeft', 
                default: "'0px'",
                types: [{ name: "string", description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox' 
            },
        ];
    }


    /** */
    private GetEvents() {
        this.events = [
            { event: 'onSelected', emits: 'T'   , description: null },
            { event: 'onUnselect', emits: 'null', description: null },
        ];
    }


    /** */
    private GetFunctions() {
        this.functions = [
            { 
                function: 'Unselect()', 
                return: 'void',
                description: null,
                params: []   
            },
            { 
                function: 'Focus()', 
                return: 'void',
                description: null,
                params: [
                    { param: 'open',  type: 'boolean = true', description: null },
                    { param: 'delay', type: 'number = 0'    , description: null }
                ]
            },
            { 
                function: 'Blur()', 
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
                types: [{ type: 'T[]', typeProp: 'getter', description: null }] 
            },
        ];
    }


    /** */
    private GetQuickImplement() {
        this.quickImplement = 
`<coer-selectbox
    label=""
    [dataSource]="[]" 
    [isInvalid]="false"
    [isLoading]="false"
    [isReadonly]="false"
    (onSelected)="null"
></coer-selectbox>`       
    }
}