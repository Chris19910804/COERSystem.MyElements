import { Component, computed, input, output, viewChild } from '@angular/core';
import { IDocumentation, IDocInput, IDocEvent, IDocFunction, IDocProperty, IDocOption } from '@Interfaces';
import { CoerAccordion } from 'coer-elements/components';
import { Section, Tools } from 'coer-elements/tools'; 

@Component({
    selector: 'documentation-information',
    templateUrl: './documentation-information.component.html',
    styleUrl: './documentation-information.component.scss',
    standalone: false 
})
export class DocumentationInformationComponent extends Section<IDocumentation> { 

    //Elements
    protected _accordion = viewChild.required<CoerAccordion>('accordion');

    //Inputs
    public type        = input.required<'Inputs' | 'Events' | 'Functions' | 'Properties'>();
    public information = input<IDocInput[] | IDocEvent[] | IDocFunction[] | IDocProperty[]>([]);

    //Outputs
    public onOpenAccordion = output<'Inputs' | 'Events' | 'Functions' | 'Properties'>();  


    //computed
    protected _information = computed<IDocumentation[]>(() => {
        switch(this.type()) {
            case 'Inputs': return (this.information() as IDocInput[]).map<IDocumentation>(item => (
                { 
                    name: item.input, 
                    response: item.default,
                    description: null,
                    options: item.types.map<IDocOption>(option => (
                        {
                            name: option.name,
                            type: null,
                            description: option.description
                        }
                    ))
                }
            ));
           
            case 'Events': return (this.information() as IDocEvent[]).map<IDocumentation>(item => (
                { 
                    name: item.event, 
                    response: item.emits,
                    description: item.description,
                    options: []
                }
            ));
            
            case 'Functions': return (this.information() as IDocFunction[]).map<IDocumentation>(item => (
                { 
                    name: item.function, 
                    response: item.return,
                    description: item.description,
                    options: item.params.map<IDocOption>(option => (
                        {
                            name: option.param,
                            type: option.type,
                            description: option.description
                        }
                    ))
                }
            ));
            
            case 'Properties': return (this.information() as IDocProperty[]).map<IDocumentation>(item => (
                { 
                    name: item.property, 
                    response: item.default,
                    description: item.description,
                    options: item.types.map<IDocOption>(option => (
                        {
                            name: option.type,
                            type: option.typeProp,
                            description: option.description
                        }
                    ))
                }
            ));
            
            default: return[];
        } 
    });


    //computed
    protected _response = computed<'Default' | 'Emits' | 'Return' | ''>(() => {
        switch(this.type()) {
            case 'Inputs'    : return 'Default'; 
            case 'Events'    : return 'Emits';  
            case 'Functions' : return 'Return';  
            case 'Properties': return 'Default'; 
            default: return '';
        } 
    });
    

    /** */
    protected _OpenAccordion(): void {
        this.onOpenAccordion.emit(this.type());
        Tools.Sleep().then(() => this._accordion().ScrollToAccordion()); 
    }


    /** */
    public Open(): void {
        if(Tools.IsNotNull(this._accordion())) {
            this._accordion().Open();
            Tools.Sleep().then(() => this._OpenAccordion()); 
        }
    }


    /** */
    public Close(): void {
        if(Tools.IsNotNull(this._accordion())) {
            this._accordion().Close();
        }
    }
}