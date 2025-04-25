import { DOCUMENTATION } from 'projects/coer-elements-documentation/src/app/shared/components/documentation/documentation.component'; 
import { Component } from '@angular/core';
import { Page } from 'coer-elements/tools';  
import { IDocEvent, IDocFunction, IDocInput, IDocProperty, IDocumentation } from '@Interfaces';
import { CoerTextBox } from 'coer-elements/components';

@Component({
    selector: 'coer-textbox-page',
    templateUrl: './coer-textbox.component.html',
    standalone: false
})
export class CoerTextboxPage extends Page {

    protected readonly component = CoerTextBox;

    //Variables
    protected inputs:     IDocInput[] = [];
    protected events:     IDocEvent[] = [];
    protected functions:  IDocFunction[] = [];
    protected properties: IDocProperty[] = [];
    protected quickImplement: string = '';

    constructor() { 
        super('coer-textbox');  
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
                    { name: "string", description: DOCUMENTATION.notDataBind },
                    { name: "number", description: DOCUMENTATION.notDataBind }
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
                types: [{ name: 'placeholder', description: null }],
                component: 'TextBox'
            },
            { 
                input: 'textPosition', 
                default: "'left'",
                types: [
                    { name: "'left'",   description: null }, 
                    { name: "'center'", description: null }, 
                    { name: "'right'",  description: null }
                ],
                component: 'Dropdown'
            },
            { 
                input: 'minLength', 
                default: '0', 
                types: [{ name: 'number', description: 'Minimum character length that the component allows' }],
                component: 'NumberBox'
            },
            { 
                input: 'maxLength', 
                default: '50', 
                types: [{ name: 'number', description: 'Maximum character length that the component allows' }],
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
                input: 'externalButton', 
                default: '{ show: false }', 
                types: [{ name: 'IBoxButton', description: null }],
                component: 'Several'
            },
            { 
                input: 'selectOnFocus', 
                default: 'false', 
                types: [{ name: 'boolean', description: 'When you focus the component it selects the text' }],
                component: 'Switch'
            },
            { 
                input: 'showClearIcon', 
                default: 'false', 
                types: [{ name: 'boolean', description: null }],
                component: 'Switch'
            },
            { 
                input: 'showSearchIcon', 
                default: 'false', 
                types: [{ name: 'boolean', description: null }],
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
                types: [{ name: 'boolean', description: DOCUMENTATION.isInvalid }],
                component: 'Switch'
            },
            { 
                input: 'width', 
                default: '100%', 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'minWidth', 
                default: '190px', 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'maxWidth', 
                default: '100%', 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'marginTop', 
                default: '0px', 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'marginRight', 
                default: '0px', 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'marginBottom', 
                default: '0px', 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'marginLeft', 
                default: '0px', 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
        ];
    }


    /** */
    private GetEvents() {
        this.events = [
            { event: 'onKeyupEnter',          emits: 'string | number', description: null },
            { event: 'onInput',               emits: 'string | number', description: null },
            { event: 'onClickClear',          emits: 'void'           , description: null },
            { event: 'onClickSearch',         emits: 'string | number', description: null },
            { event: 'onClickExternalButton', emits: 'void'           , description: null }, 
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
                    { param: 'delay',  type: 'number  = 0'    , description: null }
                ]
            }, 
            { 
                function: 'Blur()',  
                return: 'void', 
                description: null,
                params: []
            },
            { 
                function: 'Clear()', 
                return: 'void',
                description: null,
                params: [ 
                    { param: 'delay', type: 'number = 0', description: null }
                ] 
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
`<coer-textbox
    label=""
    [isLoading]="false"
    [isInvalid]="false"
    [isReadonly]="false"
></coer-textbox>`       
    }
}