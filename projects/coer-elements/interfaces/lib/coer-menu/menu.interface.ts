export interface IMenu {
    id?: number;
    label: string;
    icon?: string;
    path?: string;
    show?: 'LIST' | 'GRID';
    readonly?: boolean;
    secuence?: number; 
    items?: IMenu[];
}