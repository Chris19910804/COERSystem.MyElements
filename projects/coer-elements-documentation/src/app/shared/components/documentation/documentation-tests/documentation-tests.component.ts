import { Component, ComponentRef, input, Type, ViewChild, viewChildren, ViewContainerRef } from '@angular/core'; 
import { CoerDropdown, CoerSwitch, CoerTextBox } from 'coer-elements/components';
import { Section, Tools } from 'coer-elements/tools'; 
import { IDocInput } from '@Interfaces';  

@Component({
    selector: 'documentation-tests',
    templateUrl: './documentation-tests.component.html',
    styleUrl: './documentation-tests.component.scss',
    standalone: false 
})
export class DocumentationTestsComponent<T> extends Section<T> { 
    
    //Elements
    @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;
    protected _coerDropdownList = viewChildren(CoerDropdown);
    protected _coerTextboxList = viewChildren(CoerTextBox);
    protected _coerSwitchList = viewChildren(CoerSwitch);
    
    //Variables
    protected _id: string = Tools.GetGuid();
    protected _component!: ComponentRef<T>; 
    protected _componentName: string = '';

    //Inputs  
    public inputs    = input<IDocInput[]>([]);
    public component = input<Type<T>>(); 


    protected override async RunSection() {  
        if(Tools.IsNotNull(this.component())) { 
            this._component = this.container.createComponent(this.component()!);   
            this._componentName = this.component()?.name.replaceAll('_', '') || '';
        } 
    };   


    /** */
    protected _SetDefaultValue(item: IDocInput, id: string): void {  
        Tools.Sleep().then(() => {  
            switch(id.split('-')[0]) {
                case 'TextBox': {
                    if (Tools.IsNotNull(item.default)) {
                        if(item.default?.startsWith("'")) item.default = item.default.substring(1);
                        if(item.default?.endsWith("'"))   item.default = item.default.substring(0, item.default.length - 1);
                    }
    
                    const coerTextbox = this._coerTextboxList().find(x => x.id() === id);
                    
                    if(Tools.IsNotNull(coerTextbox)) { 
                        coerTextbox!.value = item.default;
                        this._component.setInput(item.input, String(item.default));
                    }  

                    break;
                }

                case 'Dropdown': {
                    if (Tools.IsNotNull(item.default)) {
                        if(item.default?.startsWith("'")) item.default = item.default.substring(1);
                        if(item.default?.endsWith("'"))   item.default = item.default.substring(0, item.default.length - 1);
                    }

                    const coerDropdown = this._coerDropdownList().find(x => x.id() === id);
                 
                    if(Tools.IsNotNull(coerDropdown)) { 
                        coerDropdown!.value = { name: item.default };
                        this._component.setInput(item.input, String(item.default));
                    }
     
                    break;
                }
    
                case 'Switch': { 
                    const coerSwitch = this._coerSwitchList().find(x => x.id() === id);
                 
                    if(Tools.IsNotNull(coerSwitch)) { 
                        coerSwitch!.value = String(item.default) == 'true';
                        this._component.setInput(item.input, String(item.default) == 'true');
                    }   

                    break;
                }
            } 
        });
    }


    /** */
    protected _SetInput(item: IDocInput, value: any, inputType: 'TextBox' | 'Dropdown'| 'Switch'): void {        
        Tools.Sleep(0, 'SET_INPUT').then(() => { 
            switch(inputType) {
                case 'TextBox': {                      
                    item.default = value; 
                    this._component.setInput(item.input, String(value)); 
                    break;
                }

                case 'Dropdown': {                    
                    if(value.startsWith("'")) value = value.substring(1);
                    if(value.endsWith("'"))   value = value.substring(0, value.length - 1); 
    
                    item.default = value; 
                    this._component.setInput(item.input, value);                     
                    break;
                } 
    
                case 'Switch': { 
                    item.default = value;  
                    this._component.setInput(item.input, String(value) === 'true');
                    break;
                }
            } 
        }); 
    } 


    /** */
    protected _GetDataSource(input: IDocInput): { name: string; }[] {
        return input.types.map(item => {
            if(item.name.startsWith("'")) item.name = item.name.substring(1);
            if(item.name.endsWith("'"))   item.name = item.name.substring(0, item.name.length - 1); 
            return { name: item.name };
        });
    }


    


    
}