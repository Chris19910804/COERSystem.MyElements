import { signal } from "@angular/core"; 
const reference_signal = signal<any>({});

export const Tools = {
    /** Generate a Guid */
    GetGuid: (seed: string = 'coer-system') => {
        let time = new Date().getTime();
        seed = seed.toString().trim()
        return seed + `-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
            const random = (time + Math.random() * 16) % 16 | 0
            time = Math.floor(time / 16)
            return (c == 'x' ? random : (random & 0x3 | 0x8)).toString(16)
        })
    },


    /** Returns true if the value is null or undefined, false otherwise */
    IsNull: (value: any): boolean => {
        return (value === undefined || value === null);
    },


    /** Returns true if the value is not null or undefined, false otherwise */
    IsNotNull: (value: any): boolean => {
        return !Tools.IsNull(value); 
    },


    /** Returns true if the value is null or undefined or contains only whitespace, false otherwise */
    IsOnlyWhiteSpace: (value: any): boolean => {
        return Tools.IsNull(value) || (typeof value === 'string' && value.trim() === '');
    },


    /** Returns true if has string value and is not only whitespace, false otherwise */
    IsNotOnlyWhiteSpace: (value: any): boolean => {
        return Tools.IsNotNull(value) && !Tools.IsOnlyWhiteSpace(value); 
    }, 


    /** Avoid Null value */
    AvoidNull: <T>(value: T | null | undefined, type: 'string' | 'number' | 'boolean' | null = null): T => {       
        if (typeof value === 'string') {
            if (type === null || type === 'string') {
                return (Tools.IsNotNull(value) ? value : '') as T;
            }

            else if (type === 'number') {
                return (Tools.IsNotNull(value) ? Number(value) : 0) as T;
            }
            
            else if (type === 'boolean') {
                return (Tools.IsNotNull(value) ? (value.toUpperCase().trim() === 'TRUE') : false) as T;
            }
        }         

        if (typeof value === 'number') {
            if (type === null || type === 'number') {
                return (Tools.IsNotNull(value) ? value : 0) as T;
            }

            else if (type === 'string') {
                return (Tools.IsNotNull(value) ? String(value) : '0') as T;
            }
            
            else if (type === 'boolean') {
                return (Tools.IsNotNull(value) ? (value >= 1) : false) as T;
            }  
        } 

        if (typeof value === "boolean") {
            if (type === null || type === 'boolean') {
                return (Tools.IsNotNull(value) ? value : false) as T;
            }

            else if (type === 'string') {
                return (Tools.IsNotNull(value) ? (value ? 'true' : 'false') : 'false') as T;
            }
            
            else if (type === 'number') {
                return (Tools.IsNotNull(value) ? (value ? 1 : 0) : 0) as T;
            }  
        } 

        switch(type) {
            case 'string' : return '' as T;
            case 'number' : return 0 as T;
            case 'boolean': return false as T;
            default: return '' as T;
        }
    }, 


    /** */
    RemoveAccents: (value: string | null | undefined): string => {
        if(Tools.IsOnlyWhiteSpace(value)) return '';
        return value!.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); 
    },


    /** Break reference of a object or array */
    BreakReference: <T>(object: T): T => { 
        if (object === null) return object;
        if (typeof object === 'undefined') return object;
        if (typeof object === 'string') return object;
        if (typeof object === 'number') return object;
        if (typeof object === 'boolean') return object;
        const OBJECT = JSON.parse(JSON.stringify(object));
        return (Array.isArray(OBJECT) ? [...OBJECT] : { ...OBJECT }) as T;
    },


    /** Clean extra whitespaces */
    CleanUpBlanks: (text: string | number): string => {
        if(Tools.IsOnlyWhiteSpace(text)) return '';
        let words: string[] = String(text).split(' ');
        words = words.filter(x => x.length > 0);
        return words.join(' ');
    },
    

    /** Get properties of an object */
    GetPropertyList: <T>(object: T | null | undefined): string[] => {
        const properties: string[] = [];
        if (object === null) return properties;
        if (typeof object === 'undefined') return properties;
        if (typeof object === 'string') return properties;
        if (typeof object === 'number') return properties;
        if (typeof object === 'boolean') return properties;
        for(const property in object) properties.push(String(property));
        return properties;
    },


    /**
     * Set an index and merge more arrays of the same type
     * */
    SetIndex: <T>(array: T[], ...args: T[][]): T[] => {
        let index = 0;
        for (const arg of args) {
            array = Tools.BreakReference(array).concat(Tools.BreakReference(arg));
        }

        return Tools.BreakReference(array).map(item => Object.assign({ index: index++ }, item));
    },


    /** Set First Char To Lower */
    FirstCharToLower: (text: string | null | undefined): string => {
        if (Tools.IsOnlyWhiteSpace(text)) return '';

        const textArray: string[] = [];
        for(let i = 0; i < text!.length; i++) {
            if(i === 0) textArray.push(text![i].toLowerCase());
            else textArray.push(text![i]);
        }

        return textArray.join('');
    },


    /** Set First Char To Upper */
    FirstCharToUpper: (text: string | null | undefined): string => {
        if (Tools.IsOnlyWhiteSpace(text)) return '';

        const textArray: string[] = [];
        for(let i = 0; i < text!.length; i++) {
            if(i === 0) textArray.push(text![i].toUpperCase());
            else textArray.push(text![i]);
        }

        return textArray.join('');
    }, 


    /** Sort an array in ascending order by property */
    SortBy: <T>(array: T[], property: string, propertyType: 'string' | 'number' = 'string'): T[] => {
        switch (propertyType) {
            case 'string': {
                return array.sort((x: any, y: any) => {
                    if (String(x[property]).toUpperCase().trim() < String(y[property]).toUpperCase().trim()) return -1;
                    else if (String(x[property]).toUpperCase().trim() > String(y[property]).toUpperCase().trim()) return 1;
                    else return 0;
                });
            }

            case 'number': {
                return array.sort((x: any, y: any) => Number(x[property] - Number(y[property])));
            }
        }
    },


    /** Sort an array in descending order by property */
    SortByDesc: <T>(array: T[], property: string, propertyType: 'string' | 'number' = 'string'): T[] => {
        switch (propertyType) {
            case 'string': {
                return array.sort((x: any, y: any) => {
                    if (String(x[property]).toUpperCase().trim() < String(y[property]).toUpperCase().trim()) return 1;
                    else if (String(x[property]).toUpperCase().trim() > String(y[property]).toUpperCase().trim()) return -1;
                    else return 0;
                });
            }

            case 'number': {
                return array.sort((x: any, y: any) => Number(Number(y[property])) - x[property]);
            }
        }
    },


    /** Return a string with forman numeric */
    GetNumericFormat: (value: string | number | null | undefined, decimals: number = 0): string => {
        if (Tools.IsOnlyWhiteSpace(value) || isNaN(Number(value))) {
            return '0';
        }

        let valueInteger = '';
        let valueDecimal = '';
        value = value!.toString().replaceAll(' ', '');

        if (value.includes('.') || (decimals > 0)) {
            valueInteger = value.includes('.') ? value.split('.')[0] : value;

            if (decimals > 0) {
                const PADDING = decimals - valueDecimal.length;
                valueDecimal = value.includes('.') ? value.split('.')[1] : '';
                for(let i = 0; i < PADDING; i++) valueDecimal += '0';
                valueDecimal = valueDecimal.substring(0, decimals);
                valueDecimal = `.${valueDecimal}`;
            }
        }

        else {
            valueInteger = value;
        }

        let counter = 0;
        const VALUE_INTEGER_ARRAY: string[] = [];
        for(const char of valueInteger.split('').reverse()) {
            if (counter == 3) {
                VALUE_INTEGER_ARRAY.push(',');
                counter = 0;
            }

            VALUE_INTEGER_ARRAY.push(char);
            ++counter;
        }

        valueInteger = VALUE_INTEGER_ARRAY.reverse().join('');
        return `${valueInteger}${valueDecimal}`;
    },


    /** Wait the time indicated */
    Sleep: (milliseconds: number = 0, reference: string | null = null): Promise<void> => {
        if (Tools.IsNull(reference)) {
            return new Promise(Resolve => setTimeout(Resolve, milliseconds));
        }

        else return new Promise<void>(Resolve => {
            reference = reference!.replaceAll(' ', '_').toLowerCase();

            if (reference_signal().hasOwnProperty(reference)) {
                clearInterval(reference_signal()[reference!]);
            }

            reference_signal.set(Object.assign(reference_signal(), {
                [reference!]: setTimeout(() => {
                    Resolve();
                    clearInterval(reference_signal()[reference!]);
                    const _reference = { ...reference_signal() };
                    delete _reference[reference!];
                    reference_signal.set({ ..._reference });
                }, milliseconds)
            }));
        });
    },


    /** */
    Distinct: <T>(array: T[], ...args: T[][]): T[] => { 
        for (const arg of args) {
            array = Tools.BreakReference(array).concat(Tools.BreakReference(arg));
        } 

        return Array.from(new Set(array));
    },


    /** */
    Except: <T>(array: T[], filter: any[], ...properties: string[]): T[] => {
        const result: T[] = [];
         
        for (const item of array as any[]) {
            if (typeof item === 'object' && Tools.IsNotNull(properties) && properties.length > 0) {
                if (!filter.some(x => x[properties[0]] === item[properties[0]])) {
                    result.push(item);
                }
            } 
        }

        return [...result];
    }
};