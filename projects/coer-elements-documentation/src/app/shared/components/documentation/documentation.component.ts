export * from './documentation.descriptions';

import { DocumentationInformationComponent } from './documentation-information/documentation-information.component';
import { Component, computed, input, output, signal, Type, viewChild } from '@angular/core'; 
import { Section, Tools } from 'coer-elements/tools'; 
import { IDocEvent, IDocFunction, IDocInput, IDocProperty, IDocumentation } from '@Interfaces';
import { CoerModal } from 'coer-elements/components';

@Component({
    selector: 'documentation',
    templateUrl: './documentation.component.html',
    styleUrl: './documentation.component.scss', 
    standalone: false
})
export class DocumentationComponent extends Section<IDocumentation> { 

    //Elements 
    protected informationInputs     = viewChild.required<DocumentationInformationComponent>('informationInputs');
    protected informationEvents     = viewChild.required<DocumentationInformationComponent>('informationEvents');
    protected informationFunctions  = viewChild.required<DocumentationInformationComponent>('informationFunctions');
    protected informationProperties = viewChild.required<DocumentationInformationComponent>('informationProperties');
    protected modalQuickImplement   = viewChild.required<CoerModal>('modalQuickImplement');

    //Variables
    protected _id: string = Tools.GetGuid('documentation');
    protected _show   = signal<'Information' | 'Tests'>('Tests');
    protected _search = signal<string>('');

    //Inputs   
    public component      = input<Type<any>>(); 
    public inputs         = input<IDocInput[]>([]);
    public events         = input<IDocEvent[]>([]);
    public functions      = input<IDocFunction[]>([]);
    public properties     = input<IDocProperty[]>([]);
    public quickImplement = input<string>('');
  
    //Outputs
    public onOpen = output<string>();


    //computed
    protected _inputs = computed<IDocInput[]>(() => {
        const inputs = this.inputs();
        const search = this._search().trim().toUpperCase();

        return (Tools.IsNotOnlyWhiteSpace(search)) 
            ? inputs.filter(x => x.input.trim().toUpperCase().includes(search))
            : inputs;
    });


    //computed
    protected _events = computed<IDocEvent[]>(() => {
        const events = this.events();
        const search = this._search().trim().toUpperCase();

        return (Tools.IsNotOnlyWhiteSpace(search)) 
            ? events.filter(x => x.event?.trim().toUpperCase().includes(search))
            : events;
    });


    //computed
    protected _functions = computed<IDocFunction[]>(() => {
        const functions = this.functions();
        const search    = this._search().trim().toUpperCase();

        return (Tools.IsNotOnlyWhiteSpace(search)) 
            ? functions.filter(x => x.function?.trim().toUpperCase().includes(search))
            : functions;
    });


    //computed
    protected _properties = computed<IDocProperty[]>(() => {
        const properties = this.properties();
        const search     = this._search().trim().toUpperCase();

        return (Tools.IsNotOnlyWhiteSpace(search)) 
            ? properties.filter(x => x.property?.trim().toUpperCase().includes(search))
            : properties;
    });


    //computed
    protected _showSearch = computed<boolean>(() => {
        const inputs     = this.inputs();
        const events     = this.events();
        const functions  = this.functions();
        const properties = this._properties();
        const show       = this._show();

        return show == 'Information' &&
            (inputs.length > 0 || events.length > 0 || functions.length > 0 || properties.length > 0)
    }); 


    /** */
    protected _OpenAccorddion(accordion: 'Inputs' | 'Events' | 'Functions' | 'Properties') {      
        switch(accordion) {
            case 'Inputs': {  
                this.informationEvents().Close();
                this.informationFunctions().Close();
                this.informationProperties().Close();  
                break;
            }

            case 'Events': {
                this.informationInputs().Close();
                this.informationFunctions().Close();
                this.informationProperties().Close();
                break;
            }

            case 'Functions': {
                this.informationInputs().Close();
                this.informationEvents().Close();
                this.informationProperties().Close();
                break;
            }

            case 'Properties': {
                this.informationInputs().Close();
                this.informationEvents().Close();
                this.informationFunctions().Close();
                break;
            }
        } 
        
        this.onOpen.emit(accordion);
    } 


    /** */
    public ShowQuickImplement(): void {
        this.modalQuickImplement().Open();
    } 


    /** */
    protected async Copy() {
        try {
            await navigator.clipboard.writeText(this.quickImplement());
            this.alert.Info('Code copied', 'Quick Implement', 'bi bi-clipboard-fill');
        } 
        
        catch { 
            this.alert.Warning('Unable to copy to clipboard', 'Quick Implement', 'bi bi-clipboard-fill');
        }        
    }
}