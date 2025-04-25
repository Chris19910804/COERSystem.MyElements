export interface IGridHeaderButton {
    show: boolean;
    path?: string | (string | number)[];
    tooltip?: string;
    isDisabled?: boolean;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation'; 
}