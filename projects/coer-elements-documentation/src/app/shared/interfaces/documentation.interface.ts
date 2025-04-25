export interface IDocumentation {
    name:     string | null;
    response: string | null;
    options:  IDocOption[]; 
}  

export interface IDocOption {
    name: string;
    type: string | null;
    description: string | null;
} 

export interface IDocInput {
    input:   string;
    default: string;
    types: {
        name: string;
        description: string | null;
    }[],
    component: 'TextBox' | 'NumberBox' | 'Dropdown' | 'Switch' | 'Several';
} 

export interface IDocEvent {
    event: string;
    emits: string | null;
    description: string | null;
} 

export interface IDocFunction {
    function: string;
    return:   string | null;
    description: string | null;
    params: {
        param: string;
        type:  string;
        description: string | null;
    }[];
} 

export interface IDocProperty {
    property: string;
    default:  string;
    description: string | null;
    types: {
        type: string;
        typeProp: 'variable' | 'getter' | 'computed',
        description: string | null;
    }[];
} 