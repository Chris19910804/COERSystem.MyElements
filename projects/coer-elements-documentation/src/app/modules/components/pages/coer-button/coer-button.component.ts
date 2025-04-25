import { DOCUMENTATION } from 'projects/coer-elements-documentation/src/app/shared/components/documentation/documentation.component';
import { Component } from '@angular/core';
import { Page } from 'coer-elements/tools';
import { IDocEvent, IDocFunction, IDocInput, IDocProperty } from '@Interfaces'; 
import { CoerButton } from 'coer-elements/components';

@Component({
    selector: 'coer-button-page',
    templateUrl: './coer-button.component.html',
    standalone: false
})
export class CoerButtonPage extends Page {
     
    protected readonly component = CoerButton;

    //Variables
    protected inputs:     IDocInput[] = [];
    protected events:     IDocEvent[] = [];
    protected functions:  IDocFunction[] = [];
    protected properties: IDocProperty[] = [];
    protected quickImplement: string = '';

    constructor() { 
        super('coer-button');        
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
                input: 'color', 
                default: "'default'", 
                types: [
                    { name: "'default'",     description: 'Without color' },
                    { name: "'primary'",     description: null },
                    { name: "'secondary'",   description: null },
                    { name: "'success'",     description: null },
                    { name: "'warning'",     description: null },
                    { name: "'danger'",      description: null },
                    { name: "'navigation'",  description: null },
                    { name: "'information'", description: null }, 
                    { name: "'dark'",        description: null },
                    { name: "'light'",       description: null },
                ],
                component: 'Dropdown'
            },
            { 
                input: 'type', 
                default: "'filled'", 
                types: [
                    { name: "'filled'",         description: 'The button is shown filled in'                                           },
                    { name: "'outline'",        description: 'Removes the fill color from the button and shows the border'             },
                    { name: "'icon'",           description: 'The button is displayed filled without the text and shows only the icon' },
                    { name: "'icon-outline'",   description: 'Remove button padding color, show border and icon'                       },
                    { name: "'icon-no-border'", description: 'Removes the button padding color with the border and shows the icon'     },
                ],
                component: 'Dropdown'
            },
            { 
                input: 'icon', 
                default: '',
                types: [{ name: 'string', description: DOCUMENTATION.icons }],
                component: 'TextBox'
            },
            { 
                input: 'iconPosition', 
                default: "'left'", 
                types: [
                    { name: "'left'",  description: null }, 
                    { name: "'right'", description: null }
                ],
                component: 'Dropdown'
            },
            { 
                input: 'path',
                default: '',  
                types: [{ name: 'string | string[]', description: 'Set a route to navigate' }],
                component: 'Several'
            },
            { 
                input: 'animation', 
                default: 'false', 
                types: [{ name: 'boolean', description: 'This property allows the button to appear dynamically. This works when the DOM is fully loaded.' }],
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
                default: "'125px'", 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'minWidth', 
                default: "'30px'", 
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
                default: "'40px'", 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'minHeight', 
                default: "'30px'", 
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
            }
        ];
    }


    /** */
    private GetEvents() {
        this.events = [
            { event: 'onClick', emits: 'void', description: 'When clicking on the component, the component must be enabled for the event to be emitted' },  
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
        this.properties = [];
    }


    /** */
    private GetQuickImplement() {
        this.quickImplement = 
`<coer-button
    color='primary'  
    icon=''
    [isLoading]='false'
    [isDisabled]='false'
    [isReadonly]='false'
    (onClick)='null'  
> Click </coer-button>`       
    }
}