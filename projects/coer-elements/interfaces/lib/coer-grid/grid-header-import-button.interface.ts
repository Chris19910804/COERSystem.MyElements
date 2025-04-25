export interface IGridHeaderImportButton {
    show: boolean;
    path?: string | (string | number)[];
    tooltip?: string;
    isDisabled?: boolean;
    preventDefault?: boolean;
    Autofill?: boolean;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation'; 
}