import { DOCUMENTATION } from 'projects/coer-elements-documentation/src/app/shared/components/documentation/documentation.component';
import { Component } from '@angular/core'; 
import { Page } from 'coer-elements/tools'; 
import { IDocEvent, IDocFunction, IDocInput, IDocProperty } from '@Interfaces';
import { CoerTextarea } from 'coer-elements/components';

@Component({
    selector: 'coer-textarea-page',
    templateUrl: './coer-textarea.component.html', 
    standalone: false
})
export class CoerTextareaPage extends Page {   

    protected readonly component = CoerTextarea;

    //Variables
    protected inputs:     IDocInput[] = [];
    protected events:     IDocEvent[] = [];
    protected functions:  IDocFunction[] = [];
    protected properties: IDocProperty[] = [];
    protected quickImplement: string = '';

    constructor() { 
        super('coer-textarea') 
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
                    { name: "'left'", description: null   }, 
                    { name: "'center'", description: null }, 
                    { name: "'right'", description: null  }
                ],
                component: 'Dropdown'
            },
            { 
                input: 'minLength', 
                default: '0',
                types: [{ name: 'number', description: null }],
                component: 'NumberBox'
            },
            { 
                input: 'maxLength', 
                default: '2500',
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
                input: 'resize', 
                default: 'false',
                types: [{ name: "boolean", description: null }],
                component: 'Switch'
            },
            { 
                input: 'showFooter', 
                default: 'true',
                types: [{ name: "boolean", description: null }],
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
                input: 'height', 
                default: "'80px'",
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
            { event: 'onInput', emits: 'string', description: null },
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
                    { param: 'select', type: 'select = false', description: null },
                    { param: 'delay',  type: 'number = 0',     description: null }
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
                    { param: 'delay',  type: 'number = 0', description: null }
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
                description: '',
                types: [{ type: 'string | number', typeProp: 'getter', description: DOCUMENTATION.notDataBind }] 
            } 
        ];
    }


    /** */
    private GetQuickImplement() {
        this.quickImplement = 
``       
    }
}