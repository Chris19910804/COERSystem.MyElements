import { DOCUMENTATION } from 'projects/coer-elements-documentation/src/app/shared/components/documentation/documentation.component';
import { IDocEvent, IDocFunction, IDocInput, IDocProperty } from '@Interfaces';
import { CoerGrid } from 'coer-elements/components';
import { Component } from '@angular/core'; 
import { Page } from 'coer-elements/tools';

@Component({
    selector: 'coer-grid-page',
    templateUrl: './coer-grid.component.html', 
    standalone: false
})
export class CoerGridPage extends Page { 

    protected readonly component = CoerGrid; 

    //Variables
    protected inputs:     IDocInput[] = [];
    protected events:     IDocEvent[] = [];
    protected functions:  IDocFunction[] = [];
    protected properties: IDocProperty[] = [];
    protected quickImplement: string = '';
     
    constructor() { 
        super('coer-grid');
    } 


    /** */
    protected override async RunPage() {
        this.GetInputs();
        this.GetEvents(); 
        this.GetFunctions();
        this.GetProperties();
        this.GetQuickImplement(); 
    }      


    /** */
    private GetInputs() {
        this.inputs = [
            { 
                input: 'columns',  
                default: '',
                types: [{ name: 'IGridColumn<T>[]', description: 'Setting columns to display' }],
                component: 'Several'
            },
            { 
                input: 'cleanColumnName', 
                default: 'true',
                types: [{ name: 'boolean', description: 'Add formatting to column name if it is not aliased' }],
                component: 'Switch'
            },
            { 
                input: 'saveButton', 
                default: '{ show: false }', 
                types: [{ name: 'IGridHeaderButton', description: 'Settings for the generic save button' }],
                component: 'Several'
            },
            { 
                input: 'addButton', 
                default: '{ show: false }', 
                types: [{ name: 'IGridHeaderButton', description: 'Settings for the generic add button' }],
                component: 'Several'
            },
            { 
                input: 'exportButton', 
                default: '{ show: false }',
                types: [{ name: 'IGridHeaderExportButton', description: 'Settings for the generic export button' }],
                component: 'Several'
            },
            { 
                input: 'importButton', 
                default: '{ show: false }',
                types: [{ name: 'IGridHeaderImportButton', description: 'Settings for the generic import button' }],
                component: 'Several'
            },
            { 
                input: 'search', default: '{ show: false, ignore: false }', 
                types: [{ name: 'IGridSearch', description: 'Settings for the generic search input' }],
                component: 'Several'
            },
            { 
                input: 'buttonByRow',  
                default: '',
                types: [{ name: 'IGridButtonByRow<T>', description: 'Setting to enable buttons per row' }],
                component: 'Several'
            },
            { 
                input: 'checkbox', 
                default: '{ show: false }', 
                types: [{ name: 'IGridCheckbox', description: 'Setting to enable checkbox per row' }],
                component: 'Several'
            },
            { 
                input: 'tooltipByRow',
                default: '',  
                types: [{ name: 'string', description: 'Specify the name of the column to be displayed to complement the message on the buttons per row' }],
                component: 'TextBox'
            },
            { 
                input: 'isLoading', 
                default: 'false',
                types: [{ name: 'boolean', description: DOCUMENTATION.isLoading }],
                component: 'Switch'
            },
            { 
                input: 'isDisabled', 
                default: 'false',
                types: [{ name: 'boolean', description: DOCUMENTATION.isDisabled }],
                component: 'Switch'
            },
            { 
                input: 'isReadonly', 
                default: 'false',  
                types: [{ name: 'boolean', description: DOCUMENTATION.isReadonly }],
                component: 'Switch'
            },
            { 
                input: 'isInvisible', 
                default: 'false',  
                types: [{ name: 'boolean', description: DOCUMENTATION.isInvisible }],
                component: 'Switch'
            },
            { 
                input: 'rowsByPage', 
                default: '50',  
                types: [{ name: 'number', description: 'Number of rows to display by page' }],
                component: 'NumberBox'
            },
            //{ 
            //    name: 'groupBy',  
            //    options: [{ name: 'string', description: 'In Development' }],
            //},
            //{ 
            //    name: 'showColumnGrouped',  default: 'false',
            //    options: [{ name: 'boolean', description: 'In Development' }]
            //},
            //{ 
            //    name: 'rowsByGroup', default: '50', 
            //    options: [{ name: 'number', description: 'In Development' }]
            //},
            { 
                input: 'showFooter', 
                default: 'true',   
                types: [{ name: 'boolean', description: 'Displays the number of rows and the number of selected rows' }],
                component: 'Switch'
            },
            { 
                input: 'enableSort', 
                default: 'true',  
                types: [{ name: 'boolean', description: 'Sort by clicking on the headers' }],
                component: 'Switch'
            },
            { 
                input: 'enableRowFocus', 
                default: 'true',
                types: [{ name: 'boolean', description: null }],
                component: 'Switch'
            },
            { 
                input: 'width', 
                default: "'100%'",
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'MinWidth', 
                default: "'250px'",
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'MaxWidth',  
                default: "'100%'",
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'height',  
                default: "'350px'", 
                types: [{ name: 'string', description: `${DOCUMENTATION.cssMeasurement}. Set 'full' or 'full-form' to fit the screen` }],
                component: 'TextBox'
            },
            { 
                input: 'minHeight', 
                default: "'140px'",  
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'maxHeight', 
                default: "'100vh'", 
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            },
            { 
                input: 'margin', 
                default: "'auto'",
                types: [{ name: 'string', description: DOCUMENTATION.cssMeasurement }],
                component: 'TextBox'
            }, 
        ];
    }


    /** */
    private GetEvents() {
        this.events = [
            { event: 'onClickSave',       emits: 'void'                     , description: null },
            { event: 'onClickAdd',        emits: 'void'                     , description: null },
            { event: 'onClickImport',     emits: 'IGridImport<T>'           , description: null },
            { event: 'onClickExport',     emits: 'T[]'                      , description: null },
            { event: 'onClickRow',        emits: 'T'                        , description: null },
            { event: 'onDoubleClickRow',  emits: 'T'                        , description: null },
            { event: 'onClickDeleteRow',  emits: 'T'                        , description: null },
            { event: 'onClickEditRow',    emits: 'T'                        , description: null },
            { event: 'onClickGoRow',      emits: 'T'                        , description: null },
            { event: 'onKeyupEnter',      emits: 'IGridKeyupEnter'          , description: null },
            { event: 'onKeyupEnterLast',  emits: 'void'                     , description: null },
            { event: 'onSwitchChange',    emits: 'IGridInputSwitchChange<T>', description: null },
            { event: 'onTextboxChange',   emits: 'IGridInputTextbox<T>'     , description: null },
            { event: 'onSelectboxChange', emits: 'IGridInputTextbox<T>'     , description: null },
            { event: 'onCheckboxChange',  emits: 'IGridInputCheckbox<T>'    , description: null }, 
        ];
    }


    /** */
    private GetFunctions() {
        this.functions = [
            { 
                function: 'FocusSearch()', 
                return: 'void', 
                description: null,
                params: [{ param: 'select', type: 'boolean = false', description: null }]
            }, 
            { 
                function: 'GetRowBy()', 
                return: 'T | null',
                description: null,
                params: [{ param: 'callback', type: '(row: T) => boolean', description: null }]
            },
            { 
                function: 'Import()', 
                return: 'void',
                description: null,
                params: []
            },
            { 
                function: 'Export()', 
                return: 'void',
                description: null,
                params: [{ param: 'exportFile', type: 'boolean | undefined = true', description: null }]
            },
            { 
                function: 'FocusInput()',
                return: 'void',
                description: null,
                params: [
                    { param: 'indexRow',    type: 'number = -1', description: null },
                    { param: 'indexColumn', type: 'number = -1', description: null },
                    { param: 'onlyFocus',   type: 'boolean = false', description: null }
                ]
            },
            { 
                function: 'FocusLastInput()', 
                return: 'void',
                description: null,
                params: [ 
                    { param: 'onlyFocus', type: 'boolean = false', description: null }
                ]
            },
            { 
                function: 'FocusRow()', 
                return: 'void',
                description: null,
                params: [{ param: 'callback', type: '(row: T) => boolean', description: null }]
            },
            { 
                function: 'Sort()', 
                return: 'void',
                description: null,
                params: [{ param: 'columnName', type: 'string', description: null }]
            },
            { 
                function: 'CheckAll()',  
                return: 'void',
                description: null,
                params: [] 
            }, 
            { 
                function: 'UncheckAll()', 
                return: 'void',
                description: null,
                params: []
            }, 
            { 
                function: 'CheckBy()', 
                return: 'void',
                description: null,
                params: [{ param: 'callback', type: '(row: T) => boolean', description: null }]
            }, 
            { 
                function: 'UncheckBy()', 
                return: 'void',
                description: null,
                params: [{ param: 'callback', type: '(row: T) => boolean', description: null }]
            },
            { 
                function: 'Unshift()', 
                return: 'void',
                description: null,
                params: [
                    { param: 'row', type: 'T', description: null },
                    { param: 'focus', type: 'boolean = true', description: null },
                    { param: 'onlyFocus', type: 'boolean = false', description: null }
                ]
            },
            { 
                function: 'Push()', 
                return: 'void',
                description: null,
                params: [
                    { param: 'row', type: 'T', description: null },
                    { param: 'focus', type: 'boolean = true', description: null },
                    { param: 'onlyFocus', type: 'boolean = false', description: null }
                ]
            },
            { 
                function: 'DeleteRow()', 
                return: 'Promise<void>',
                description: null,
                params: [{ param: 'indexRow', type: 'number', description: null }]
            },
            { 
                function: 'DeleteRowsBy()', 
                return: 'Promise<void>',
                description: null,
                params: [{ param: 'callback', type: '(row: T) => boolean', description: null }]
            },
        ];
    }


    /** */
    private GetProperties() {
        this.properties = [
            {
                property: 'dataSource', 
                default: '',
                description: null,
                types: [{ type: 'T[]', typeProp: 'computed', description: null }]
            },
            {
                property: 'selectedItems', 
                default: '',
                description: null,
                types: [{ type: 'T[]', typeProp: 'computed', description: null }]
            },
            {
                property: 'isValid', 
                default: '',
                description: null,
                types: [{ type: 'boolean', typeProp: 'getter', description: null }]
            },
        ];
    }


    /** */
    private GetQuickImplement() {
        this.quickImplement = 
`<section class="coer-container-grid">
    <coer-grid
        [(ngModel)]="dataSource"
        [columns]="[
            { property: 'name', alias: 'Ejemplo' },
        ]"
        [search]="{ show: true }"
        [exportButton]="{ show: true }"
        [isLoading]="isLoading"
        [addButton]="{ show: true }"
        [buttonByRow]="{ showDeleteButton: false, showEditButton: false, showGoButton: true }"
        (onClickGoRow)="null"
    ></coer-grid>
</section>`       
    }
}