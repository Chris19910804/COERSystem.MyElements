import { DOCUMENTATION } from 'projects/coer-elements-documentation/src/app/shared/components/documentation/documentation.component'; 
import { IDocEvent, IDocFunction, IDocInput, IDocProperty } from '@Interfaces';
import { CoerNumberBox } from 'coer-elements/components';
import { Page } from 'coer-elements/tools'; 
import { Component } from '@angular/core'; 

@Component({
    selector: 'coer-numberbox-page',
    templateUrl: './coer-numberbox.component.html', 
    standalone: false
})
export class CoerNumberboxPage extends Page {   

    protected readonly component = CoerNumberBox;

    //Variables
    protected inputs:     IDocInput[] = [];
    protected events:     IDocEvent[] = [];
    protected functions:  IDocFunction[] = [];
    protected properties: IDocProperty[] = [];
    protected quickImplement: string = '';

    constructor() { 
        super('coer-numberbox') 
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
                input: 'value',
                default: '',
                types: [
                    { name: 'string', description: DOCUMENTATION.notDataBind },
                    { name: 'number', description: DOCUMENTATION.notDataBind }
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
                    { name: "'left'"  , description: null }, 
                    { name: "'center'", description: null }, 
                    { name: "'right'" , description: null }
                ],
                component: 'Dropdown'
            },
            { 
                input: 'min', 
                default: '0',
                types: [{ name: 'number', description: null }],
                component: 'NumberBox'
            },
            { 
                input: 'max', default: `${DOCUMENTATION.sqlMaxInt}`,
                types: [{ name: 'number', description: null }],
                component: 'NumberBox'
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
                input: 'selectOnFocus', 
                default: 'true',
                types: [{ name: 'boolean', description: null }],
                component: 'Switch'
            },
            { 
                input: 'decimals', 
                default: '0',
                types: [{ name: 'number', description: null }],
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
            { event: 'onKeyupEnter', emits: 'string | number', description: null },
            { event: 'onInput',      emits: 'string | number', description: null },
        ];
    }


    /** */
    private GetFunctions() {
        this.functions = [
            { 
                function: 'Focus()', 
                return: 'void',
                description: null,
                params: [
                    { param: 'select', type: 'boolean = false', description: null },
                    { param: 'delay',  type: 'number = 0'     , description: null }
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
                types: [{ type: 'string | number', typeProp: 'getter', description: null }]
            },
        ];
    }


    /** */
    private GetQuickImplement() {
        this.quickImplement = 
``       
    }
}