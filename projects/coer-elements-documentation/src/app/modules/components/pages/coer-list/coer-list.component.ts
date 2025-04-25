import { DOCUMENTATION } from 'projects/coer-elements-documentation/src/app/shared/components/documentation/documentation.component'; 
import { IDocEvent, IDocFunction, IDocInput, IDocProperty } from '@Interfaces';
import { CoerList } from 'coer-elements/components';
import { Page } from 'coer-elements/tools';
import { Component } from '@angular/core';

@Component({
    selector: 'coer-list-page',
    templateUrl: './coer-list.component.html', 
    standalone: false
})
export class CoerListPage extends Page { 
     
    protected readonly component = CoerList; 

    //Variables
    protected inputs:     IDocInput[] = [];
    protected events:     IDocEvent[] = [];
    protected functions:  IDocFunction[] = [];
    protected properties: IDocProperty[] = [];
    protected quickImplement: string = '';

    constructor() { 
        super('coer-list'); 
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
                input: 'dataSource', 
                default: '[]',
                types: [{ name: 'T[]', description: null }],
                component: 'Several'
            },
            { 
                input: 'propDisplay', 
                default: "'name'",
                types: [{ name: 'string', description: null }],
                component: 'TextBox'
            },
            { 
                input: 'header', 
                default: '',
                types: [{ name: 'string', description: null }],
                component: 'TextBox'
            },
            { 
                input: 'headerIcon',   
                default: '',
                types: [{ name: 'string', description: DOCUMENTATION.icons }],
                component: 'TextBox'
            },
            { 
                input: 'showDeleteButtonByRow', 
                default: 'false', 
                types: [
                    { name: 'boolean',  description: null },
                    { name: 'callback', description: '(item: T, index: number) => boolean' }
                ],
                component: 'Several'
            },
            { 
                input: 'showGoButtonByRow', 
                default: 'false', 
                types: [
                    { name: 'boolean', description: null },
                    { name: 'callback', description: '(item: T, index: number) => boolean' }
                ],
                component: 'Several'
            },
            { 
                input: 'showBackButton', 
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
                input: 'isDraggable', 
                default: 'false', 
                types: [{ name: 'boolean', description: null }],
                component: 'Switch'
            },
            { 
                input: 'showSearch',  
                default: 'false', 
                types: [{ name: 'boolean', description: null }],
                component: 'Switch'
            },
            { 
                input: 'template',
                default: '',
                types: [{ name: 'callback', description: '(item: T, index: number) => string' }],
                component: 'Several'
            },
            { 
                input: 'width', 
                default: "'100%'", 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'minWidth', 
                default: "'250px'", 
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
                default: "'350px'", 
                types: [{ name: 'string', description: `${DOCUMENTATION.cssMeasurement}. Set 'full' or 'full-form' to fit the screen` }],
                component: 'TextBox'
            },
            { 
                input: 'minHeight', 
                default: "'140px'", 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'maxHeight', 
                default: "'100vh'", 
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
            { event: 'onDrop',        emits: 'T'   , description: null },
            { event: 'onSort',        emits: 'T[]' , description: null },
            { event: 'onClick',       emits: 'T'   , description: null },
            { event: 'onDoubleClick', emits: 'T'   , description: null },
            { event: 'onClickDelete', emits: 'T'   , description: null },
            { event: 'onClickGo',     emits: 'T'   , description: null },
            { event: 'onClickBack',   emits: 'void', description: null },
        ];
    }


    /** */
    private GetFunctions() {
        this.functions = [];
    }


    /** */
    private GetProperties() {
        this.properties = [];
    }


    /** */
    private GetQuickImplement() {
        this.quickImplement = 
`<section class="coer-container-list">
    <coer-list
        header="'My List'"
        headerIcon="fa-solid fa-fire"
        [dataSource]="[]"
        propDisplay="name"
        [isDraggable]="true"
        [isLoading]="false" 
    ></coer-list> 
</section>`       
    }
}