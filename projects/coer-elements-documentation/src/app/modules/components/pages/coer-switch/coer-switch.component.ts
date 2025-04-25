import { DOCUMENTATION } from 'projects/coer-elements-documentation/src/app/shared/components/documentation/documentation.component';
import { Component } from '@angular/core'; 
import { Page } from 'coer-elements/tools'; 
import { IDocEvent, IDocFunction, IDocInput, IDocProperty, IDocumentation } from '@Interfaces';
import { CoerSwitch } from 'coer-elements/components';

@Component({
    selector: 'coer-switch-page',
    templateUrl: './coer-switch.component.html', 
    standalone: false
})
export class CoerSwitchPage extends Page {   

    protected readonly component = CoerSwitch;

    //Variables
    protected inputs:     IDocInput[] = [];
    protected events:     IDocEvent[] = [];
    protected functions:  IDocFunction[] = [];
    protected properties: IDocProperty[] = [];
    protected quickImplement: string = '';

    constructor() { 
        super('coer-switch') 
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
                types: [{ name: 'boolean', description: DOCUMENTATION.notDataBind }], 
                component: 'Switch'
            },
            { 
                input: 'label',  
                default: '', 
                types: [{ name: 'string', description: null }],
                component: 'TextBox'
            },
            { 
                input: 'labelPosition', 
                default: "'after'",
                types: [
                    { name: "'before'", description: null }, 
                    { name: "'after'", description: null }
                ],
                component: 'Dropdown'
            },
            { 
                input: 'isLoading', 
                default: 'false', 
                types: [{ name: "boolean", description: DOCUMENTATION.isLoading }],
                component: 'Switch'
            },
            { 
                input: 'isDisabled', 
                default: 'false', 
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
                input: 'tooltip', 
                default: 'false', 
                types: [{ name: "string", description: null }],
                component: 'TextBox'
            },
            { 
                input: 'tooltipPosition', 
                default: "'top'", 
                types: [
                    { name: "'top'", description: null }, 
                    { name: "'right'", description: null }, 
                    { name: "'bottom'", description: null }, 
                    { name: "'left'", description: null }
                ],
                component: 'Dropdown'
            },
        ];
    }


    /** */
    private GetEvents() {
        this.events = [
            { event: 'onChange', emits: 'boolean', description: null }
        ];
    }


    /** */
    private GetFunctions() {
        this.functions = [
            { 
                function: 'Focus()', 
                return: 'void',
                description: null,
                params: [] 
            }
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
``       
    }
}