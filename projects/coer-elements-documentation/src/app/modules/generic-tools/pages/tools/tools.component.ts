import { Component } from '@angular/core'; 
import { Page } from 'coer-elements/tools';   
import { IDocumentation } from '@Interfaces';

@Component({
    selector: 'tools-page',
    templateUrl: './tools.component.html', 
    standalone: false
})
export class ToolsPage extends Page {   

    //Variables 
    protected functions: any[] = [];

    constructor() { 
        super('Tools') 
    }    


    /** */
    protected override RunPage() {
        this.GetFunctions();
    }   


    /** */
    private GetFunctions() {
        this.functions = [
            { 
                name: 'GetGuid()', 
                return: 'string', 
                options: [
                    { name: 'seed', type: "string = 'coer-system'", description: "Sets the seed at the beginning of the guid" }
                ]
            },
            { 
                name: 'IsNull()',  
                return: 'boolean', 
                options: [{ name: 'value', description: "any" }] 
            },
            { 
                name: 'IsNotNull()',  
                return: 'boolean', 
                options: [{ name: 'value', description: "any" }] 
            },
            { 
                name: 'IsOnlyWhiteSpace()',  
                return: 'boolean', 
                options: [{ name: 'value', description: "any" }] 
            },
            { 
                name: 'IsNotOnlyWhiteSpace()',  
                return: 'boolean', 
                options: [{ name: 'value', description: "any" }] 
            },
            { 
                name: 'AvoidNull()',  
                return: 'T', 
                options: [
                    { name: 'value', description: "T" },
                    { name: 'type', description: "'string' | 'number' | 'boolean' | null = null" }
                ] 
            },
            { 
                name: 'RemoveAccents()',  
                return: 'string', 
                options: [{ name: 'value', description: "string" }] 
            },
            { 
                name: 'BreakReference()',  
                return: 'T', 
                options: [{ name: 'object', description: "T" }] 
            },
            { 
                name: 'CleanUpBlanks()',  
                return: 'string', 
                options: [{ name: 'text', description: "string" }] 
            },
            { 
                name: 'GetPropertyList()',  
                return: 'string[]', 
                options: [{ name: 'object', description: "T" }] 
            },
            { 
                name: 'SetIndex()',  
                return: 'T[]', 
                options: [
                    { name: 'array', description: "T[]" },
                    { name: '...args', description: "T[][]" }
                ] 
            },
            { 
                name: 'FirstCharToLower()',  
                return: 'string', 
                options: [{ name: 'text', description: "string" }] 
            },
            { 
                name: 'FirstCharToUpper()',  
                return: 'string', 
                options: [{ name: 'text', description: "string" }] 
            },
            { 
                name: 'SortBy()',  
                return: 'T[]', 
                options: [
                    { name: 'array', description: "T[]" },
                    { name: 'property', description: "string" },
                    { name: 'propertyType', description: "'string' | 'number' = 'string'" }
                ] 
            },
            { 
                name: 'SortByDesc()',  
                return: 'T[]', 
                options: [
                    { name: 'array', description: "T[]" },
                    { name: 'property', description: "string" },
                    { name: 'propertyType', description: "'string' | 'number' = 'string'" }
                ] 
            },
            { 
                name: 'GetNumericFormat()',  
                return: 'string', 
                options: [{ name: 'value', description: "string | number" }] 
            },
            { 
                name: 'Sleep()',  
                return: 'Promise<void>', 
                options: [
                    { name: 'milliseconds', description: "number = 0" },
                    { name: 'reference', description: "string | null" }
                ], 
            },
            { 
                name: 'Except()',  
                return: 'T[]', 
                options: [
                    { name: 'array', description: "T[]" },
                    { name: 'filter', description: "any[]" },
                    { name: '...args', description: "string[]" }
                ] 
            },
        ];
    }
     
}