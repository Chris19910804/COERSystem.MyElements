import { IGridButtonByRow, IGridColumn, IGridDataSource, IGridImport, IGridHeaderButton, IGridHeaderExportButton, IGridKeyupEnter, IGridSearch, IGridInput, IGridSort, IGridCheckbox, IGridInputCheckbox, IGridHeader, IGridHeaderImportButton } from "coer-elements/interfaces";
import { AfterViewInit, Component, ElementRef, Input, computed, inject, input, output, signal, viewChild, viewChildren } from "@angular/core";
import { CoerCheckbox } from "../../lib/coer-checkbox/coer-checkbox.component";
import { CoerNumberBox } from "../../lib/coer-numberbox/coer-numberbox.component";
import { CoerSelectbox } from "../../lib/coer-selectbox/coer-selectbox.component";
import { CoerTextBox } from "../../lib/coer-textbox/coer-textbox.component";
import { CoerAlert, ControlValue, DateTime, ElementsHTML, Screen, Tools } from 'coer-elements/tools';

@Component({
    selector: 'coer-grid-extension',
    template: ''
})
export class CoerGridExtension<T> extends ControlValue implements AfterViewInit {

    //Injections
    protected readonly alert = inject(CoerAlert);

    //Elements
    protected _inputFile = viewChild.required<ElementRef>('inputFileRef');
    protected _inputSearch = viewChild.required<CoerTextBox>('inputSearch');
    protected _coerTextboxList = viewChildren(CoerTextBox);
    protected _coerNumberboxList = viewChildren(CoerNumberBox);
    protected _coerSelectboxList = viewChildren(CoerSelectbox);
    protected _coerCheckboxList = viewChildren(CoerCheckbox);

    //Variables
    protected override _value: T[] = [];
    protected _value_signal = signal<T[]>([]);
    protected _gridSearch = signal<string | number>('');
    protected _isLoading = signal<boolean>(true); 
    protected _isLoadingMessage: boolean = true;
    protected _id: string = Tools.GetGuid('coer-grid');
    protected _expandedGroups: string[] = [];
    protected _enableAnimations: boolean = false;
    protected _indexFocus = signal<number>(0);
    protected _sort = signal<IGridSort>({ columnName: '', direction: 'none', icon: '' });

    //Generic Tools
    protected GetNumericFormat = Tools.GetNumericFormat; 
    protected GetElementWidth = ElementsHTML.GetElementWidth; 
    protected GetElementHeight = ElementsHTML.GetElementHeight;  

    //Inputs
    @Input() saveButton:   IGridHeaderButton = { show: false };
    @Input() addButton:    IGridHeaderButton = { show: false };
    @Input() exportButton: IGridHeaderExportButton = { show: false };
    @Input() importButton: IGridHeaderImportButton = { show: false };
    @Input() search:       IGridSearch = { show: false, ignore: false };    
    @Input() buttonByRow:  IGridButtonByRow<T> = {};
    @Input() checkbox:     IGridCheckbox = { show: false };
    public columns           = input<IGridColumn<T>[]>([]);
    public cleanColumnName   = input<boolean>(true); 
    public tooltipByRow      = input<string>('');
    public isLoading         = input<boolean>(false);
    public isDisabled        = input<boolean>(false);
    public isReadonly        = input<boolean>(false);
    public isInvisible       = input<boolean>(false);
    public rowsByPage        = input<number>(50);
    public groupBy           = input<string>('');
    public showColumnGrouped = input<boolean>(false);
    public rowsByGroup       = input<number>(50);
    public showFooter        = input<boolean>(true);
    public enableSort        = input<boolean>(true);
    public enableRowFocus    = input<boolean>(true);
    public enableNext        = input<boolean>(true);
    public width             = input<string>('100%');
    public MinWidth          = input<string>('250px');
    public MaxWidth          = input<string>('100%');
    public height            = input<string>('350px');
    public minHeight         = input<string>('140px');
    public maxHeight         = input<string>('100vh');
    public margin            = input<string>('auto'); 

    //Outputs
    public onClickSave       = output<void>();
    public onClickAdd        = output<void>();
    public onClickImport     = output<IGridImport<T>>();
    public onClickExport     = output<T[]>();
    public onClickRow        = output<T>();
    public onDoubleClickRow  = output<T>();
    public onClickDeleteRow  = output<T>();
    public onClickEditRow    = output<T>();
    public onClickGoRow      = output<T>();
    public onKeyupEnter      = output<IGridKeyupEnter>();
    public onKeyupEnterLast  = output<void>();
    public onSwitchChange    = output<IGridInput<T>>();
    public onTextboxChange   = output<IGridInput<T>>();
    public onSelectboxChange = output<IGridInput<T>>();
    public onCheckboxChange  = output<IGridInputCheckbox<T>>();

    //computed
    protected _isDisabled = computed<boolean>(() => {
        return this.isDisabled() || this.isLoading() || this.isInvisible();
    });

    //computed
    protected _isGrouped = computed<boolean>(() => {
        return this.groupBy().length > 0;
    });

    //getter
    protected get _height(): string {
        let height = this.height();

        if (height == 'full' || height == 'full-form') {
            const TOOLBAR = 45;
            const PAGE_HEADER = 70;
            const FORM = (height == 'full-form') ? 70 : 0;
            const GRID_HEADER = document.getElementById(`${this._id}-header`)!;
            const HEADER = (GRID_HEADER && GRID_HEADER.children.length > 0) ? 50 : 0;
            const MARGIN = 30;
            const PADDING = 20;
            const FOOTER = this.showFooter() ? 24.5 : 0;
            height = (Screen.WINDOW_HEIGHT - TOOLBAR - PAGE_HEADER - MARGIN - FORM - HEADER - PADDING - FOOTER) + 'px';
        }

        return height;
    }

    //getter
    protected get _onlyOneCheck() {
        return Tools.IsNotNull(this.checkbox.onlyOneCheck) && this.checkbox.onlyOneCheck;
    }


    ngAfterViewInit() {
        Tools.Sleep().then(() => {
            this._enableAnimations = true;
            this._isLoading.set(false);
            this._isLoadingMessage = false;
        });
    }

    //ControlValueAccessor
    public override SetValue(value: T[]): void {
        let indexRow = 0;
        if(!Tools.IsNotNull(value)) value = [];

        const dataSource = Tools.BreakReference(value).map((item: any) =>
            Object.assign({ checked: false }, { ...item }, { indexRow: indexRow++ })
        );

        this._UpdateValue(dataSource);
        this._value = dataSource;
        this._value_signal.set(dataSource);
    }


    //ControlValueAccessor
    public override writeValue(value: T[]): void {
        let indexRow = 0;
        if(!Tools.IsNotNull(value)) value = [];

        const dataSource = Tools.BreakReference(value).map((item: any) =>
            Object.assign({ checked: false }, { ...item }, { indexRow: indexRow++ })
        );

        this._value = dataSource;
        this._value_signal.set(dataSource);
    }


    //computed
    protected _gridColumns = computed<IGridHeader[]>(() => {
        const SET_COLUMNS = new Set<string>();

        //Has filter columns?
        if (this.columns().length > 0) {
            for (const { property } of this.columns()) {
                SET_COLUMNS.add(property);
            }
        }

        //Get all columns
        else for (const row of this._value_signal()) {
            for (const property in row) {
                SET_COLUMNS.add(property);
            }
        }

        //Remove indexRow column
        if (SET_COLUMNS.has('indexRow')) {
            SET_COLUMNS.delete('indexRow');
        }

        //Remove checked column
        if (SET_COLUMNS.has('checked')) {
            SET_COLUMNS.delete('checked');
        }

        //Remove groupBy column
        if (this._isGrouped() && !this.showColumnGrouped() && SET_COLUMNS.has(this.groupBy())) {
            SET_COLUMNS.delete(this.groupBy());
        }

        //Set index column
        let indexColumn = 0;
        return Array.from(SET_COLUMNS).map(property => Tools.BreakReference<IGridHeader>({
            columnName: property,
            indexColumn: indexColumn++,
            width: this._GetColumnConfig(property)?.width || 'auto'
        }));
    });


    //computed
    protected _gridDataSource = computed<IGridDataSource[]>(() => {
        let list = this._gridDataSourceFiltered();

        //It's Grouped?
        if (this._isGrouped()) {
            //let indexRow = 0;
            let indexGroup = 0;

            const SET_COLUMN = new Set<string>();
            for (const row of list as any) {
                SET_COLUMN.add(row[this.groupBy()]);
            }

            const DATA_SOURCE_GROPUED = [];
            for (const column of SET_COLUMN) {
                DATA_SOURCE_GROPUED.push({
                    groupBy: column,
                    indexGroup: indexGroup++,
                    length: list.filter((item: any) => item[this.groupBy()] == column).length,
                    rows: [...list]
                        .filter((item: any) => item[this.groupBy()] == column)
                        .splice(0, this.rowsByGroup())
                        //.map((item: any) => Object.assign({ indexRow: indexRow++ }, item))
                });
            }

            //Response by group
            return [...DATA_SOURCE_GROPUED].splice(0, this.rowsByPage());
        }

        //Response
        return [{
            groupBy: 'Not Grouped',
            indexGroup: -1,
            length: -1,
            rows: [...list].splice(0, this.rowsByPage())
        }];
    });


    //computed
    protected _gridDataSourceFiltered = computed<T[]>(() => {
        let list: T[] = [];

        const dataSource = Tools.BreakReference(this._value_signal());

        //Ignore Filter
        if (this._gridSearch() == '' || this.search?.ignore) {
            list = dataSource;
        }

        //Filter by search
        else {
            let listFiltered: any[] = [];
            const SET_ROW = new Set<number>();

            const columnList = Tools.IsNotNull(this.search?.columns)
                ? this.search.columns!.map(x => Tools.FirstCharToLower(x))
                : this._gridColumns().map(x => x.columnName);

            for(const columnName of columnList) {
                listFiltered = dataSource.filter((item: any) =>
                    !SET_ROW.has(item['indexRow'])
                    && String(item[Tools.FirstCharToLower(columnName)]).trim().toUpperCase().includes(String(this._gridSearch()).trim().toUpperCase())
                );

                for(const { indexRow } of listFiltered as any) {
                    SET_ROW.add(indexRow);
                }

                list = Tools.BreakReference(list.concat(listFiltered));
            }
        }

        return Tools.BreakReference(list);
    });


    /** Get Column Configuration */
    protected _GetColumnConfig = (columnName: string): IGridColumn<T> | undefined => {
        return this.columns().find(x => x.property.replaceAll(' ', '').toUpperCase() == columnName.replaceAll(' ', '').toUpperCase());
    }


    /** Clean Name or get alias */
    protected _GetColumnName = (columnName: string): string => {
        const columnConfig = this._GetColumnConfig(columnName);

        //Get Alias
        if (columnConfig && columnConfig.alias && columnConfig.alias.length > 0) {
            return columnConfig.alias;
        }

        //Clean headerName
        if (this.cleanColumnName() && columnName.length > 0) {
            columnName = Tools.FirstCharToLower(columnName);

            const charArray = [];
            for(const char of columnName) {
                if(char === char.toUpperCase()) charArray.push(' ');
                charArray.push(char);
            }

            charArray[0] = charArray[0].toUpperCase();
            columnName = charArray.join('');
        }

        return columnName.trim();
    }


    /** */
    protected _GetShortIcon = (columnName: string) => {
        return this._sort().columnName == columnName ? this._sort().icon : '';
    }


    /** */
    protected _GetSearchIcon = (columnName: string) => { 
        return this.search.show 
            && (Tools.IsNull(this.search?.ignore)  || !this.search.ignore)
            && (Tools.IsNull(this.search?.columns) || this.search.columns?.includes(columnName)) 
            && String(this._gridSearch()).trim().length > 0
            ? 'fa-solid fa-magnifying-glass ms-auto' : '';
    }


    /** */
    protected _GetId = (indexRow: number, indexColumn: number, suffix: string = ''): string => {
        if (suffix.length > 0) suffix = `-${suffix}`;
        return `${this._id}-row${indexRow}column${indexColumn}${suffix}`;
    }


    /** */
    protected _GetCellValue = (row: any, columnName: string): any => {
        return row[Tools.FirstCharToLower(columnName).replaceAll(' ', '')];
    }


    /** */
    protected _GetDateFormat = (date: string, toLocalZone: boolean = true) => {
        if (toLocalZone) date = DateTime.ToLocalZone(date);
        return DateTime.GetDateFormat(date);
    }


    /** */
    protected _GetDateTimeFormat = (date: string, toLocalZone: boolean = true) => {
        if (toLocalZone) date = DateTime.ToLocalZone(date);
        return DateTime.GetDateTimeFormat(date);
    }  

    /** */
    protected _GetTooltip = (prefix: string, row: any, suffix: string = ''): string => {
        let column = Tools.FirstCharToLower(this.tooltipByRow()).replaceAll(' ', '');

        if (suffix.length > 0) {
            suffix = ` ${suffix}`;
        }

        return this.tooltipByRow().length > 0
            ? `${prefix} ${row[column]}${suffix}`
            : `${prefix}${suffix}`;
    }


    /** */
    protected _HideRow = (group: IGridDataSource): boolean => {
        return (this._isGrouped() ? !(this._expandedGroups.some(x => x == group.groupBy)) : false)
    }


    /** */
    protected _IsCellType(property: string, data: any, type: 'number' | 'date' | 'date-time' | 'toLocalZone' | 'template' | 'coerTextbox' | 'coerNumberbox' | 'coerSelectbox'  | 'coerSwitch'): boolean {
        let response = false;
        const columnConfig = this._GetColumnConfig(property);
        const value = data[property];
        const row = Tools.BreakReference(data);

        if (columnConfig) {
            if (['coerTextbox', 'coerNumberbox', 'coerSelectbox', 'coerSwitch'].includes(type) && !this.isReadonly()) {
                const inputConfig: any = columnConfig;
                response = inputConfig.hasOwnProperty(type)
                    && typeof inputConfig[type] === 'function'
                    && inputConfig[type]({ indexRow: data.indexRow, property, row, value }).isInput;
            }

            else switch(type) {
                case 'number': {
                    if (typeof columnConfig.typeNumber === 'boolean') {
                        response = columnConfig.typeNumber;
                    }

                    else if (typeof columnConfig.typeNumber === 'function') {
                        response = (data === null) ? false : columnConfig.typeNumber({ indexRow: data.indexRow, property, row, value });
                    }

                    break;
                }

                case 'date': {
                    if (data === null) return false;

                    if (typeof columnConfig.typeDate === 'boolean') {
                        response = columnConfig.typeDate;
                    }

                    else if (typeof columnConfig.typeDate === 'function') {
                        response = (data === null) ? false : columnConfig.typeDate({ indexRow: data.indexRow, property, row, value });
                    }

                    break;
                }


                case 'date-time': {
                    if (data === null) return false;

                    if (typeof columnConfig.typeDateTime === 'boolean') {
                        response = columnConfig.typeDateTime;
                    }

                    else if (typeof columnConfig.typeDateTime === 'function') {
                        response = (data === null) ? false : columnConfig.typeDateTime({ indexRow: data.indexRow, property, row, value });
                    }

                    break;
                }


                case 'toLocalZone': {
                    response = true;
                    
                    if (data === null) return true;

                    if (typeof columnConfig.toLocalZone === 'boolean') {
                        response = columnConfig.toLocalZone;
                    }

                    else if (typeof columnConfig.toLocalZone === 'function') {
                        response = (data === null) ? true : columnConfig.toLocalZone({ indexRow: data.indexRow, property, row, value });
                    } 

                    break;
                }

                case 'template': {
                    if (data === null) return false;
                    response = (typeof columnConfig.template === 'string') || (typeof columnConfig.template === 'function');
                    break;
                }
            }
        }

        return response;
    }


    /** */
    protected _IsCellColor(property: string, data: any, color: 'colorBlue' | 'colorGreen' | 'colorYellow' | 'colorRed'): boolean {
        let response = false;
        const columnConfig: any = this._GetColumnConfig(property);

        if (columnConfig) {
            if (typeof columnConfig[color] === 'boolean') {
                response = columnConfig[color];
            }

            else if (typeof columnConfig[color] === 'function') {
                response = columnConfig[color]({
                    indexRow: data.indexRow,
                    property,
                    row: Tools.BreakReference(data),
                    value: data[property]
                });
            }
        }

        return response;
    }


    /** */
    protected _GetAttribute(property: string, data: any, attribute: string, type: 'coerSwitch' | 'coerTextbox' | 'coerNumberbox'| 'coerSelectbox' | 'defaul-cell' ): any {
        const columnConfig = this._GetColumnConfig(property);
        const value = Tools.IsNotNull(data) ? data[property] : null;
        const row = Tools.BreakReference(data);

        if (columnConfig) {
            if (type === 'defaul-cell') {
                switch(attribute) {
                    case 'textAlign': {
                        return columnConfig?.textAlign || 'left';
                    }

                    case 'template': {
                        const inputConfig: any = columnConfig;

                        if (inputConfig.hasOwnProperty(attribute)) {
                            if(typeof inputConfig[attribute] === 'string') {
                                return inputConfig[attribute];
                            }

                            else if(typeof inputConfig[attribute] === 'function') {
                                return inputConfig[attribute]({ indexRow: data.indexRow, property, row, value }) || '';
                            }
                        }
                    }
                }
            }

            else if(['coerTextbox', 'coerNumberbox', 'coerSelectbox', 'coerSwitch'].includes(type)) {
                const inputConfig: any = columnConfig;
                if (inputConfig.hasOwnProperty(type) && typeof inputConfig[type] === 'function') {
                    return inputConfig[type]({ indexRow: data.indexRow, property, row, value })[attribute] || null;
                }
            }
        }

        return null;
    }


    /** */
    protected _ButtonByRow(property: 'showDeleteButton' | 'showEditButton' | 'showGoButton', data: any = null): boolean {
        let response = false;
        const buttonByRow: any = this.buttonByRow;
        const row = Tools.IsNotNull(data) ? Tools.BreakReference(data) : null;

        if (buttonByRow.hasOwnProperty(property)) {
            if (row === null) {
                response = (typeof buttonByRow[property] === 'boolean') ? buttonByRow[property] : true;
            }

            else if (typeof buttonByRow[property] === 'boolean') {
                response = buttonByRow[property];
            }

            else if (typeof buttonByRow[property] === 'function') {
                response = buttonByRow[property]({ indexRow: data.indexRow, property, row, value: null });
            }
        }

        return response ? (this._value && this._value.length > 0) : false;
    }


    /** */  
    protected _ColorButton(button: IGridHeaderButton | IGridHeaderImportButton | IGridHeaderExportButton): 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' {
        return Tools.IsNotNull(button) && Tools.IsNotOnlyWhiteSpace(button?.color)
            ? button!.color! : 'primary'; 
    }


    /** */  
    protected _ColorButtonByRow(property: string): 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' { 
        const BUTTON_ROW = Tools.BreakReference<any>(this.buttonByRow);

        switch (property) {
            case 'editButtonColor': {
                return Tools.IsNotNull(this.buttonByRow) && Tools.IsNotOnlyWhiteSpace(BUTTON_ROW[property]) 
                    ? BUTTON_ROW[property] : 'primary';
            }

            case 'deleteButtonColor': {
                return Tools.IsNotNull(this.buttonByRow) && Tools.IsNotOnlyWhiteSpace(BUTTON_ROW[property]) 
                    ? BUTTON_ROW[property] : 'danger';
            }

            case 'goButtonColor': { 
                return Tools.IsNotNull(this.buttonByRow) && Tools.IsNotOnlyWhiteSpace(BUTTON_ROW[property]) 
                    ? BUTTON_ROW[property] : 'navigation';
            }

            default : {
                return Tools.IsNotNull(this.buttonByRow) && Tools.IsNotOnlyWhiteSpace(BUTTON_ROW[property]) 
                    ? BUTTON_ROW[property] : 'primary'; 
            }
        }  
    }
}