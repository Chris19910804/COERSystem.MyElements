import { Component, computed } from '@angular/core';
import { CoerGridExtension } from './coer-grid.extension';
import { CoerCheckbox } from '../../lib/coer-checkbox/coer-checkbox.component';
import { CoerTextBox } from '../../lib/coer-textbox/coer-textbox.component';
import { CoerNumberBox } from '../../lib/coer-numberbox/coer-numberbox.component';
import { CoerSelectbox } from '../../lib/coer-selectbox/coer-selectbox.component';
import { IGridLength, IGridInputCheckbox } from 'coer-elements/interfaces';
import { CONTROL_VALUE, Files, Tools } from 'coer-elements/tools';


@Component({
    selector: 'coer-grid',
    templateUrl: './coer-grid.component.html',
    styleUrl: './coer-grid.component.scss',
    providers: [CONTROL_VALUE(CoerGrid)],
    standalone: false
})
export class CoerGrid<T> extends CoerGridExtension<T> {

    //computed
    public dataSource = computed<T[]>(() => {
        return Tools.BreakReference<any[]>(this._value_signal()).map(item => {
            if(item.hasOwnProperty('checked')) delete item.checked;
            if(item.hasOwnProperty('indexRow')) delete item.indexRow;
            return item;
        });
    });


    //computed
    public selectedItems = computed<T[]>(() => {
        return Tools.BreakReference<any[]>(this._value_signal()).filter(item => item.checked).map(item => {
            if(item.hasOwnProperty('checked')) delete item.checked;
            if(item.hasOwnProperty('indexRow')) delete item.indexRow;
            return item;
        });
    });


    //getter
    public get isValid() {
        return (this._coerTextboxList().length > 0 ? this._coerTextboxList().every(x => !x.isInvalid()) : true)
            && (this._coerNumberboxList().length > 0 ? this._coerNumberboxList().every(x => !x.isInvalid()) : true)
            && (this._coerSelectboxList().length > 0 ? this._coerSelectboxList().every(x => !x.isInvalid()) : true);
    }


    //computed
    protected gridLength = computed<IGridLength>(() => {
        return {
            dataSource: this._value_signal()?.length || 0,
            dataSourceFiltered: this._gridDataSourceFiltered()?.length || 0,
            dataSourceSelected: this.selectedItems()?.length || 0
        }
    });




    //computed
    //protected _columnsFiltered = computed<IGridHeader[]>(() => {
    //    return this.isGrouped() && !this.showColumnGrouped
    //        ? this._columns().filter(x => x.columnName.toUpperCase() != this.groupBy.toUpperCase())
    //        : this._columns();
    //});


    /** */
    public FocusSearch(select: boolean = false): void {
        Tools.Sleep().then(() => {
            if(this._inputSearch) this._inputSearch().Focus(select);
        });
    } 


    /** */
    public GetRowBy<T>(callback: (row: T) => boolean): T | null {
        const row = this._value.find(callback as any);
        return (row === undefined) ? null : row as T;
    }


    /** */
    protected Import(): void {
        this._Import();
    }


    /** */
    protected async _Import(event: any = null): Promise<void> {
        if (this.importButton?.preventDefault) {
            this.onClickImport.emit({ data: [], file: null });
            return;
        }

        if (event === null) {
            this._inputFile().nativeElement.value = null;
            this._inputFile().nativeElement.click();
            return;
        }

        else if (event.target!.files.length > 0) {
            this._isLoading.set(true);
            const [selectedFile] = event.target.files as File[];

            if(Files.IsExcel(selectedFile)) {
                const { rows } = await Files.ReadExcel<T>(selectedFile);

                if (Tools.IsNull(this.importButton?.Autofill) || this.importButton.Autofill) {
                    this.SetValue(rows.concat(this._value));
                    this.onClickImport.emit({ data: this._value, file: selectedFile });
                }

                else {
                    this.onClickImport.emit({ data: rows, file: selectedFile });
                }
            }

            else {
                let message = 'Allowed extensions:';
                for(const extension of Files.EXCEL_EXTENSIONS) {
                    message += ` <b>${extension}</b>,`
                }

                message = message.substring(0, message.length - 1);
                this.alert.Warning(message, 'Invalid File Type', 'bi bi-filetype-xlsx fa-lg');
                this.onClickImport.emit({ data: [], file: null });
            }

            this._inputFile().nativeElement.value = null;
            Tools.Sleep(1000).then(() => this._isLoading.set(false));
        }
    }


    /** */
    public Export(exportFile: boolean | undefined = true): void {
        let item: any = {};
        this._isLoading.set(true);
        const FILE_NAME = (this.exportButton?.fileName || 'COER Report') + '.xlsx';

        let ROW_DATA_SOURCE: T[] = [];

        if (this.exportButton.hasOwnProperty('onlySelectedItem') && this.exportButton.onlySelectedItem) {
            ROW_DATA_SOURCE = this.selectedItems();
        }

        else {
            ROW_DATA_SOURCE = (this.exportButton.hasOwnProperty('onlyRowFiltered') && !this.exportButton.onlyRowFiltered)
                ? this._value_signal() : this._gridDataSourceFiltered();
        }

        const COLUMN_DATA_SOURCE = new Set<string>();
        if (this.exportButton.hasOwnProperty('onlyColumnFiltered') && !this.exportButton.onlyColumnFiltered) {
            for (const row of this._value_signal()) {
                for (const columnName in row) {
                    if (columnName == 'indexRow') continue;
                    COLUMN_DATA_SOURCE.add(Tools.FirstCharToLower(columnName));
                }
            }
        }

        else {
            for (const { columnName } of this._gridColumns()) {
                if (columnName == 'indexRow') continue;
                COLUMN_DATA_SOURCE.add(Tools.FirstCharToLower(columnName));
            }
        }

        const EXPORT_DATA: T[] = [];
        for (const row of ROW_DATA_SOURCE) {
            for (const column of COLUMN_DATA_SOURCE) {
                item = Object.assign(item, { [this._GetColumnName(column)]: (row as any)[column] });
            }

            EXPORT_DATA.push(item);
            item = Tools.BreakReference({});
        }

        if (exportFile) {
            Files.ExportExcel(EXPORT_DATA, FILE_NAME);
        }

        this.onClickExport.emit(EXPORT_DATA);
        Tools.Sleep(3000).then(() => this._isLoading.set(false));
    }


    /** */
    protected _InputChange(indexRow: number, columnName: string, value: any, input: 'coer-textbox' | 'coer-numberbox' | 'coer-selectbox' | 'coer-switch' | 'coer-textbox-search'): void {
        if (input === 'coer-textbox-search') {
            if (this._isLoading()) return;

            Tools.Sleep(0, `coerGridInputChange${columnName}`).then(async _ => {
                this._gridSearch.set(value);

                if(this.checkbox.show) {
                    this._isLoadingMessage = true;

                    await Tools.Sleep();
                    for(const row of this._value.filter((x: any) => x.checked)) {
                        this.CheckBy((x: any) => x.indexRow == (row as any).indexRow);
                    }

                    await Tools.Sleep();
                    this._isLoadingMessage = false;
                }
            });

            return;
        }

        const property = Tools.FirstCharToLower(columnName);

        const row: any = this._value[indexRow];
        row[property] = value;

        if (input === 'coer-switch') {
            this.onSwitchChange.emit({ property, row: Tools.BreakReference(row), value });
        }

        else if (input === 'coer-textbox') {
            this.onTextboxChange.emit({ property, row: Tools.BreakReference(row), value });
        }

        else if (input === 'coer-selectbox') {
            this.onSelectboxChange.emit({ property, row: Tools.BreakReference(row), value });
        }

        else if (input === 'coer-numberbox') {
            this.onTextboxChange.emit({ property, row: Tools.BreakReference(row), value });
        }

        Tools.Sleep(1000, `coerGridInputChange${indexRow}${columnName}`).then(_ => {
            this._UpdateValue(this._value);
            this._value_signal.set(this._value);
        });
    }


    /** */
    protected _KeyupEnter(indexColumn: number, row: any, input: 'coer-textbox' | 'coer-numberbox' | 'coer-textbox-search' | 'coer-selectbox', value: any): void {
        if (['coer-textbox', 'coer-numberbox', 'coer-selectbox'].includes(input)) {
            this.onKeyupEnter.emit({
                id: this._GetId(indexColumn, row.indexRow, input),
                input, row: Tools.BreakReference(row), value
            });

            if(this.enableNext()) {
                this.__NextInput(indexColumn, row.indexRow);
            }
        }

        else if (input == 'coer-textbox-search') {
            this.onKeyupEnter.emit({
                id: this._GetId(indexColumn, row.indexRow, input),
                input, row: null, value
            });
        }
    }


    /** */
    private __NextInput(indexColumn: number, indexRow: number): void {
        const INPUT_TEXT = this.columns().filter(x => Tools.IsNotNull(x.coerTextbox)).map(x => x.property);
        const INPUT_NUMBER = this.columns().filter(x => Tools.IsNotNull(x.coerNumberbox)).map(x => x.property);
        const INPUT_SELECT = this.columns().filter(x => Tools.IsNotNull(x.coerSelectbox)).map(x => x.property);

        let index = 0
        const COLUMNS = []
        const INPUT_COLUMNS = []
        for (const { columnName } of this._gridColumns()) {
            if (INPUT_TEXT.some(property => property.toUpperCase() == columnName.toUpperCase())) {
                COLUMNS.push({ indexColumn: index, property: columnName, type: 'coerTextbox' });
                INPUT_COLUMNS.push({ indexColumn: index, property: columnName, type: 'coerTextbox' });
            }

            else if (INPUT_NUMBER.some(property => property.toUpperCase() == columnName.toUpperCase())) {
                COLUMNS.push({ indexColumn: index, property: columnName, type: 'coerNumberbox' });
                INPUT_COLUMNS.push({ indexColumn: index, property: columnName, type: 'coerNumberbox' });
            }

            else if (INPUT_SELECT.some(property => property.toUpperCase() == columnName.toUpperCase())) {
                COLUMNS.push({ indexColumn: index, property: columnName, type: 'coerSelectbox' });
                INPUT_COLUMNS.push({ indexColumn: index, property: columnName, type: 'coerSelectbox' });
            }

            else {
                COLUMNS.push({ indexColumn: index, property: columnName, type: 'default-cell' });
            }

            ++index;
        }

        let lastRow = -1
        for(const { rows } of this._gridDataSource()) {
            lastRow += rows.length;
        }

        let firstColumn = -1;
        if (INPUT_COLUMNS.length > 0) {
            firstColumn = [...INPUT_COLUMNS].shift()!.indexColumn;
        }

        let lastColumn = -1;
        if (INPUT_COLUMNS.length > 0) {
            lastColumn = [...INPUT_COLUMNS].pop()!.indexColumn;
        }

        //Is Last Row & Last Input Column?
        if (indexRow == lastRow && indexColumn == lastColumn) {
            this.onKeyupEnterLast.emit();
        }

        //Is Last Input Column?
        else if (indexColumn == lastColumn) {
            this.FocusInput((indexRow + 1), firstColumn)
        }

        //Next Column?
        else {
            for (index = (indexColumn + 1); index < COLUMNS.length; index++) {
                for(const input of COLUMNS) {
                    if(index == input.indexColumn && ['coerTextbox', 'coerNumberbox', 'coerSelectbox'].includes(input.type)) {
                        this.FocusInput(indexRow, input.indexColumn);
                        return;
                    }
                }
            }
        }
    }


    /** */
    public FocusInput(indexRow: number = -1, indexColumn: number = -1, onlyFocus: boolean = false): void {
        Tools.Sleep(0, 'FocusInput').then(() => {
            if (this._isDisabled()) return;

            if (indexRow < 0 || indexColumn < 0) {
                const INPUT_TEXT = this.columns().filter(x => Tools.IsNotNull(x.coerTextbox)).map(x => x.property);
                const INPUT_NUMBER = this.columns().filter(x => Tools.IsNotNull(x.coerNumberbox)).map(x => x.property);
                const INPUT_SELECT = this.columns().filter(x => Tools.IsNotNull(x.coerSelectbox)).map(x => x.property);

                let index = 0;
                const COLUMNS = []
                for (const { columnName } of this._gridColumns()) {
                    if (INPUT_TEXT.some(property => property.toUpperCase() == columnName.toUpperCase())) {
                        COLUMNS.push({ indexColumn: index, property: columnName, type: 'coerTextbox' });
                    }

                    else if (INPUT_NUMBER.some(property => property.toUpperCase() == columnName.toUpperCase())) {
                        COLUMNS.push({ indexColumn: index, property: columnName, type: 'coerNumberbox' });
                    }

                    else if (INPUT_SELECT.some(property => property.toUpperCase() == columnName.toUpperCase())) {
                        COLUMNS.push({ indexColumn: index, property: columnName, type: 'coerSelectbox' });
                    }

                    else {
                        COLUMNS.push({ indexColumn: index, property: columnName, type: 'default-cell' });
                    }

                    ++index;
                }

                if(this.gridLength().dataSourceFiltered > 0) {
                    const FIRST_INPUT_COLUMN = COLUMNS.find(x => ['coerTextbox', 'coerNumberbox', 'coerSelectbox'].includes(x.type));

                    if (Tools.IsNotNull(FIRST_INPUT_COLUMN)) {
                        this.FocusInput(0, FIRST_INPUT_COLUMN!.indexColumn, onlyFocus);
                    }
                }
            }

            else {
                const id = this._GetId(indexRow, indexColumn);
                let element: CoerTextBox | CoerNumberBox | CoerSelectbox<any> | undefined;
                this._indexFocus.set(indexRow);

                //Focus Textbox
                element = this._coerTextboxList().find(x => x.id() == id);
                if(element) {
                    element.Focus(!onlyFocus);
                    return;
                }

                //Focus Numberbox
                element = this._coerNumberboxList().find(x => x.id() == id);
                if(element) { 
                    element.Focus(!onlyFocus);
                    return;
                }

                //Focus Selectbox
                element = this._coerSelectboxList().find(x => x.id() == id);
                if(element) {
                    Tools.Sleep(100).then(_ => element.Focus(!onlyFocus));                    
                    return;
                }
            }
        });
    }


    /** */
    public FocusLastInput(onlyFocus: boolean = false): void {
        Tools.Sleep(0, 'FocusInput').then(() => {
            if (this._isDisabled()) return;
           
            const INPUT_TEXT = this.columns().filter(x => Tools.IsNotNull(x.coerTextbox)).map(x => x.property);
            const INPUT_NUMBER = this.columns().filter(x => Tools.IsNotNull(x.coerNumberbox)).map(x => x.property);
            const INPUT_SELECT = this.columns().filter(x => Tools.IsNotNull(x.coerSelectbox)).map(x => x.property);

            let index = 0;
            const COLUMNS = []
            for (const { columnName } of this._gridColumns()) {
                if (INPUT_TEXT.some(property => property.toUpperCase() == columnName.toUpperCase())) {
                    COLUMNS.push({ indexColumn: index, property: columnName, type: 'coerTextbox' });
                }

                else if (INPUT_NUMBER.some(property => property.toUpperCase() == columnName.toUpperCase())) {
                    COLUMNS.push({ indexColumn: index, property: columnName, type: 'coerNumberbox' });
                }

                else if (INPUT_SELECT.some(property => property.toUpperCase() == columnName.toUpperCase())) {
                    COLUMNS.push({ indexColumn: index, property: columnName, type: 'coerSelectbox' });
                }

                else {
                    COLUMNS.push({ indexColumn: index, property: columnName, type: 'default-cell' });
                }

                ++index;
            }

            if(this.gridLength().dataSourceFiltered > 0) {
                const INPUT_COLUMNS = COLUMNS.filter(x => ['coerTextbox', 'coerNumberbox', 'coerSelectbox'].includes(x.type));
                const LAST_INPUT_COLUMN = INPUT_COLUMNS.pop();

                if (Tools.IsNotNull(LAST_INPUT_COLUMN)) {
                    this.FocusInput(0, LAST_INPUT_COLUMN!.indexColumn, onlyFocus);
                }
            }
        });
    }


    /** */
    public FocusRow(callback: (row: T) => boolean): void {
        Tools.Sleep().then(_ => {
            if (this._value.length > 0) {
                const row = Tools.BreakReference<any>(this._value.find(callback as any));
                if (Tools.IsNotNull(row)) this._indexFocus.set(row.indexRow);
            }
        });
    }


    /** */
    public Sort(columnName: string): void {
        if (this.enableSort()) {
            if(this._isLoading()) return;

            this._isLoading.set(true);
            this._isLoadingMessage = true;
            const { direction } = this._sort();

            let dataSource = Tools.BreakReference<any>(this._value);
            for (const checkbox of this._coerCheckboxList()) checkbox.Uncheck();

            if (direction == 'descendant') {
                Tools.SortByDesc(dataSource, columnName);
                this._sort.set({ columnName, direction: 'ascendant', icon: 'fa-solid fa-arrow-down-short-wide' });
            }

            else {
                Tools.SortBy(dataSource, columnName);
                this._sort.set({ columnName, direction: 'descendant', icon: 'fa-solid fa-arrow-up-wide-short' });
            }

            let indexRow = 0;
            dataSource = Tools.BreakReference<any>(dataSource).map((item: any) => Object.assign(item, { indexRow: indexRow++ }));
            this.SetValue(dataSource);

            this._isLoading.set(false);

            Tools.Sleep().then(() => {
                for(const row of dataSource.filter((x: any) => x.checked)) {
                    this.CheckBy((x: any) => x.indexRow == row.indexRow);
                }
    
                this._isLoadingMessage = false;
            }); 
        }
    }


    /** */
    protected _ClickCheck(id: string, checked: boolean, all: boolean, row: any = null): void { 
        if (!this._isLoading()) Tools.Sleep().then(async _ => {
            this._isLoading.set(true);

            let element = this._coerCheckboxList().find(x => x.id() == id);

            if(Tools.IsNotNull(element)) {
                let response: IGridInputCheckbox<T> = { all, checked, rows: [] };

                //All Checkbox
                if (all) {
                    if(checked) this.CheckAll();
                    else this.UncheckAll();

                    //Event
                    response.rows = this.selectedItems();
                    this.onCheckboxChange.emit(response);
                }

                //One Checkbox
                else {
                    if(this._onlyOneCheck) {
                        for (const row of this._value) {
                            (row as any).checked = false;
                        }

                        for (const checkbox of this._coerCheckboxList()) {
                            if(checkbox.id() != id) checkbox.Uncheck();
                        }
                    }

                    (this._value[row.indexRow] as any).checked = checked;
                    this.SetValue(this._value);

                    //Mark All checkbox
                    const checkboxAll = this._coerCheckboxList().find(x => x.id() == this._GetId(0, 0, 'checkboxAll'));

                    if(this._value_signal().every((x: any) => x.checked)) {
                        checkboxAll?.Check();
                    }

                    else {
                        checkboxAll?.Uncheck();
                    }

                    //Event
                    response.rows = [{ ...row }];
                    this.onCheckboxChange.emit(response);

                    this._isLoading.set(false);
                }
            }
        });
    }


    /** */
    public CheckAll(): void {
        this._isLoading.set(true);

        for (const row of this._value) {
            (row as any).checked = true;
        }

        this.SetValue(this._value);

        for (const checkbox of this._coerCheckboxList()) {
            checkbox.Check();
        }

        this._isLoading.set(false);
    }


    /** */
    public UncheckAll(): void {
        this._isLoading.set(true);

        for (const row of this._value) {
            (row as any).checked = false;
        }

        this.SetValue(this._value);

        for (const checkbox of this._coerCheckboxList()) {
            checkbox.Uncheck();
        }

        this._isLoading.set(false);
    }


    /** */
    public CheckBy(callback: (row: T) => boolean): void {
        Tools.Sleep().then(_ => {
            if (this._value.length > 0) {
                const rowList = Tools.BreakReference<any>(this._value.filter(callback as any));

                let element: CoerCheckbox | undefined;
                for(const { indexRow } of rowList) {
                    element = this._coerCheckboxList().find(x => x.id() == this._GetId(indexRow, 0, 'checkbox'));

                    if (Tools.IsNotNull(element)) {
                        element?.Check();
                    }
                }
            }
        });
    }


    /** */
    public UncheckBy(callback: (row: T) => boolean): void {
        Tools.Sleep().then(_ => {
            if (this._value.length > 0) {
                const rowList = Tools.BreakReference<any>(this._value.filter(callback as any));

                let element: CoerCheckbox | undefined;
                for(const { indexRow } of rowList) {
                    element = this._coerCheckboxList().find(x => x.id() == this._GetId(indexRow, 0, 'checkbox'));

                    if (Tools.IsNotNull(element)) {
                        element?.Uncheck();
                    }
                }
            }
        });
    }


    /** */
    protected _ClickOnRow(row: T): void {
        if(this._isDisabled()) return;

        if(Tools.IsNotNull(this.checkbox.checkOnRow) && this.checkbox.checkOnRow) {
            this.CheckBy((x: any) => x.indexRow == (row as any).indexRow);
        }

        this.onClickRow.emit(row);
    }


    /** Inserts new elements at the start */
    public Unshift(row: T, focus: boolean = true, onlyFocus: boolean = false): void {
        const dataSource = Tools.BreakReference(this._value);
        dataSource.unshift(row);
        this.SetValue(dataSource);
        if(focus) this.FocusInput(-1, -1, onlyFocus);
    }


    /** Appends new elements to the end */
    public Push(row: T, focus: boolean = true, onlyFocus: boolean = false): void {
        const dataSource = Tools.BreakReference(this._value);
        dataSource.push(row);
        this.SetValue(dataSource);
        if(focus) this.FocusLastInput(onlyFocus);  
    }


    /** Delete Row By index */
    public async DeleteRow(indexRow: number): Promise<void> {
        const dataSource = Tools.BreakReference(this._value);
        dataSource.splice(indexRow, 1);
        this.SetValue(dataSource);
    }


    /** Delete row list by callback */
    public async DeleteRowsBy(callback: (row: T) => boolean): Promise<void> {
        const indexList = Tools.BreakReference<number[]>(this._value.filter(callback as any).map((item: any) => item.indexRow));

        let dataSource: any[] = [];
        for(const indexRow of indexList) {
            dataSource = Tools.BreakReference(this._value);
            dataSource.splice(indexRow, 1);
            this.SetValue(dataSource);
            await Tools.Sleep();
        }
    }
}