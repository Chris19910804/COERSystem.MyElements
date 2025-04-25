export interface IGridHeaderExportButton {
    show: boolean;
    path?: string | (string | number)[];
    tooltip?: string;
    isDisabled?: boolean;
    fileName?: string;
    onlyColumnFiltered?: boolean;
    onlyRowFiltered?: boolean;
    onlySelectedItem?: boolean;
    preventDefault?: boolean;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation'; 
}