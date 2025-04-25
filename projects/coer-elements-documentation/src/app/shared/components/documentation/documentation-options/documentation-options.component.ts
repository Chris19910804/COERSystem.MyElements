import { Component, input } from '@angular/core';
import { IDocOption } from '@Interfaces';
import { Section } from 'coer-elements/tools'; 

@Component({
    selector: 'documentation-options',
    templateUrl: './documentation-options.component.html',
    styleUrl: './documentation-options.component.scss',
    standalone: false 
})
export class DocumentationOptionsComponent extends Section<IDocOption> { 

    private readonly PRIMITIVES = ['string', 'boolean', 'number', 'null', 'undefined', 'any'];
    private readonly FUNCTIONS = ['getter', 'setter', 'signal', 'computed', 'callback'];

    
    //Inputs  
    public options = input<IDocOption[]>([]);


    /** */
    public GetColor = (text: string) => {
        if(text.startsWith("'") && text.endsWith("'")) {
            return 'red'
        }

        else if (text.startsWith('"') && text.endsWith('"')) {
            return 'red'
        }

        else if(this.PRIMITIVES.includes(text)) {
            return 'blue';
        } 

        else if(this.FUNCTIONS.includes(text)) {
            return '#ffbd06';
        }

        return 'green'; 
    }


    /** */
    protected GetNames = (name?: string | null): string[] => { 
        return name?.split('|').map(x => x.trim()) || [];
    }


    /** */
    protected IsArray = (name?: string): boolean => { 
        return name?.includes('[]') || false;
    }


    /** */
    protected GetPath = (name: string): string | null => {  
        return (this.PRIMITIVES.includes(name)) ? null : '/interfaces'; 
    }
}