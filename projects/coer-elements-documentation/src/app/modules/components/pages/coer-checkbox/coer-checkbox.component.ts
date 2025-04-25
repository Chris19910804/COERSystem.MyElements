import { DOCUMENTATION } from 'projects/coer-elements-documentation/src/app/shared/components/documentation/documentation.component';
import { Component } from '@angular/core'; 
import { Page } from 'coer-elements/tools'; 
import { IDocEvent, IDocFunction, IDocInput, IDocProperty } from '@Interfaces';
import { CoerCheckbox } from 'coer-elements/components';

@Component({
    selector: 'coer-checkbox-page',
    templateUrl: './coer-checkbox.component.html', 
    standalone: false
})
export class CoerCheckboxPage extends Page { 
    
    protected readonly component = CoerCheckbox;

    //Variables
    protected inputs:     IDocInput[] = [];
    protected events:     IDocEvent[] = [];
    protected functions:  IDocFunction[] = [];
    protected properties: IDocProperty[] = [];
    protected quickImplement: string = '';

    constructor() { 
        super('coer-checkbox'); 
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
                types: [{ name: "string", description: DOCUMENTATION.notDataBind }],
                component: 'TextBox'
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
                    { name: "'before'", description: 'The label is placed on the left'  },
                    { name: "'after'",  description: 'The label is placed on the right' }, 
                ],
                component: 'Dropdown'
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
                input: 'ignoreDataBinding', 
                default: 'false', 
                types: [{ name: 'boolean', description: 'When the component changes value ignore the data binding' }],
                component: 'Switch'
            }
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
                function: 'Check()',   
                return: 'void', 
                description: 'Set value on true',
                params: []  
            },
            { 
                function: 'Uncheck()', 
                return: 'void', 
                description: 'Set value on false',
                params: []   
            },
        ];
    }


    /** */
    private GetProperties() {
        this.properties = [
            { 
                property: 'value', 
                default: 'false', 
                description: null,
                types: [{ type: 'boolean', typeProp: 'getter', description: null }] 
            },
        ];
    }


    /** */
    private GetQuickImplement() {
        this.quickImplement = 
`<coer-checkbox
    label="Check"    
    [isLoading]="false"
    [isDisabled]="false"
    [isReadonly]="false"
></coer-checkbox>`       
    } 
}