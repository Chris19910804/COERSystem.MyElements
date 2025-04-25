import { DOCUMENTATION } from 'projects/coer-elements-documentation/src/app/shared/components/documentation/documentation.component';
import { IDocEvent, IDocFunction, IDocInput, IDocProperty } from '@Interfaces';
import { CoerForm } from 'coer-elements/components';
import { Page } from 'coer-elements/tools'; 
import { Component } from '@angular/core'; 

@Component({
    selector: 'coer-form-page',
    templateUrl: './coer-form.component.html', 
    standalone: false
})
export class CoerFormPage extends Page {  

    protected readonly component = CoerForm;

    //Variables
    protected inputs:     IDocInput[] = [];
    protected events:     IDocEvent[] = [];
    protected functions:  IDocFunction[] = [];
    protected properties: IDocProperty[] = [];
    protected quickImplement: string = '';


    constructor() { 
        super('coer-form') 
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
                input: 'formGroup', 
                default: '',
                types: [{ name: "FormGroup", description: null }],
                component: 'Several'
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
        ];
    }


    /** */
    private GetEvents() {
        this.events = [];
    }


    /** */
    private GetFunctions() {
        this.functions = [
            { 
                function: 'TouchForm()', 
                return: 'void',
                description: 'Mark all controls as touched',
                params: []
            },
            { 
                function: 'IsInvalidControl()', 
                return: 'boolean', 
                description: null,
                params: [{ param: 'formControlName', type: 'string', description: null }]
            },
            { 
                function: 'SetControlValue()', 
                return: 'void',
                description: null,
                params: [
                    { param: 'formControlName', type: 'string', description: null },
                    { param: 'value',           type: 'any'   , description: null }
                ]
            },
            { 
                function: 'GetControlValue()', 
                return: 'T',
                description: null,
                params: [
                    { param: 'formControlName', type: 'string', description: null },
                    { param: 'alternative',     type: 'T',      description: 'Optional' }
                ]
            },
            { 
                function: 'HasControlValue()', 
                return: 'boolean',
                description: null,
                params: [{ param: 'formControlName', type: 'string', description: null }]
            },
            { 
                function: 'GetValue<T>()', 
                return: 'T',  
                description: 'Gets the value of the form',
                params: []
            },
            { 
                function: 'Reset<T>()', 
                return: 'void', 
                description: 'Reset the form',
                params: [{ param: 'properties', type: 'T | null = null', description: null }]
            },
            { 
                function: 'IsValid()', 
                return: '{ isValid: boolean; formValue: any; }',  
                description: 'Mark all controls as touched. If form is invalid emit a warning and focus first invalid control',
                params: []
            },
            { 
                function: 'Focus()',
                return: 'void',
                description: 'Focuses the specified control, otherwise the first invalid control or first control',
                params: [{ param: 'formControl', type: 'string | null = null', description:  null }]
            },
        ];
    }


    /** */
    private GetProperties() {
        this.properties = [];
    }


    /** */
    private GetQuickImplement() {
        this.quickImplement = 
`<coer-form #coerForm [formGroup]="formGroup" [isLoading]="isLoading">
    <section class="coer-container">
        <div class="row">
        
        </div>
    </section>
</coer-form>`       
    }
}