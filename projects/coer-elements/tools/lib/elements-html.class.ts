import { Colors } from "./colors.class";
import { Tools } from "./tools";
 

export const ElementsHTML = {

    /** */
    GetElement: (selector: string): HTMLElement | null => { 
        return document.querySelector(selector);
    },


    /** */
    GetCssValueBy: (selector: string, style: string) => { 
        return ElementsHTML.GetCssValue(document.querySelector(selector), style);
    },


    /** */
    GetCssValue: (element: Element | null, style: string) => { 
        return Tools.IsNotNull(element)
            ? window.getComputedStyle(element!).getPropertyValue(style)
            : ''; 
    }, 


    /** Get width in px */
    GetElementWidth: (element: HTMLElement | null | undefined, ...args: (number | HTMLElement | null | undefined)[]): string => {
        let width: number = 0;
        
        if(Tools.IsNotNull(element) && Tools.IsNotOnlyWhiteSpace(element?.offsetWidth)) {
            width += element!.offsetWidth;

            for (const arg of args) {
                if (typeof arg == 'number') width += arg;

                else if(Tools.IsNotNull(arg) && Tools.IsNotOnlyWhiteSpace(arg?.offsetWidth)) {
                    width += arg!.offsetWidth;
                } 
            }
        } 
        
        return `${width}px`; 
    }, 


    /** Get height in px */
    GetElementHeight: (element: HTMLElement | null | undefined, ...args: (number | HTMLElement | null | undefined)[]): string => {
        let height: number = 0;
        
        if(Tools.IsNotNull(element) && Tools.IsNotOnlyWhiteSpace(element?.offsetHeight)) {
            height += element!.offsetHeight;

            for (const arg of args) {
                if (typeof arg == 'number') height += arg;

                else if(Tools.IsNotNull(arg) && Tools.IsNotOnlyWhiteSpace(arg?.offsetHeight)) {
                    height += arg!.offsetHeight;
                }                
            }
        } 

        return `${height}px`;
    }, 


    /** */
    IsInvalidElement: (element: any): boolean => { 
        let isInvalid = true;

        if (Tools.IsNotNull(element)) {        
            if(typeof element == 'object') {
                const properties = Tools.GetPropertyList(element);  
    
                if (properties.includes('_isTouched') && properties.includes('_value')) {
                    isInvalid = element.isTouched  && Tools.IsOnlyWhiteSpace(element.value);
                }
            }    
        }

        return isInvalid;
    }, 


    /** Get color in hexadecimal format */
    GetElementColor: (element: HTMLElement | null | undefined): string => {
        if(Tools.IsNotNull(element)) {
            let rgb: string | number[] = window.getComputedStyle(element!).getPropertyValue('color');
            rgb = rgb.replace('rgb(', '').replace(')', '');
            rgb = rgb.split(',').map(item => Number(item));

            const red   = rgb[0];
            const green = rgb[1];
            const blue  = rgb[2];
            const alpha = (rgb.length > 3) ? rgb[3] : undefined;

            return Colors.ToHexadecimal(red, green, blue, alpha);
        }  

        return '';
    }
};