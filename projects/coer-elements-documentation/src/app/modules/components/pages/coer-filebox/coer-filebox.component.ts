import { DOCUMENTATION } from 'projects/coer-elements-documentation/src/app/shared/components/documentation/documentation.component';
import { IDocEvent, IDocFunction, IDocInput, IDocProperty } from '@Interfaces';
import { CoerFilebox } from 'coer-elements/components';
import { Page } from 'coer-elements/tools'; 
import { Component } from '@angular/core'; 

@Component({
    selector: 'coer-filebox-page',
    templateUrl: './coer-filebox.component.html', 
    standalone: false
})
export class CoerFileboxPage extends Page {   

    protected readonly component = CoerFilebox;

    //Variables
    protected inputs:     IDocInput[] = [];
    protected events:     IDocEvent[] = [];
    protected functions:  IDocFunction[] = [];
    protected properties: IDocProperty[] = [];
    protected quickImplement: string = '';

    constructor() { 
        super('coer-filebox') 
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
                input: 'type', 
                default: "'image'",
                types: [{ name: "'image'", description: 'The component works in an image-oriented manner' }],
                component: 'Dropdown'
            },
            { 
                input: 'multiple', 
                default: 'false', 
                types: [{ name: 'boolean', description: 'Accepts multiple file selection' }],
                component: 'Switch'
            },
            { 
                input: 'image', 
                default: 'null',   
                types: [{ name: 'IFileImage | null', description: 'Sets an image to the component if it is image-oriented' }],
                component: 'Several'
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
        ];
    }


    /** */
    private GetEvents() {
        this.events = [
            { event: 'onSelected',    emits: 'IFile[]', description: 'When select a file'  },
            { event: 'onDeleteImage', emits: 'void',    description: 'When delete a image' }, 
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
`<coer-filebox 
    type="image"
    [image]="{ value: null, name: 'Image Example' }"
    [isLoading]="false"
    [isDisabled]="false"
    (onDeleteImage)="null"
></coer-filebox>`       
    }
}