import { IMenu } from "coer-elements/interfaces";

export const STATIC_NAVIGATION: IMenu[] = [ 
    // Home
    {   label: 'Home', icon: 'fa-house fa-sharp fa-solid', path: '/home', secuence: 0   },

    //Components
    {   
        label: 'Components', icon: 'fa-solid fa-grip', show: 'GRID', secuence: 0, 
        items: [
            {   label: 'Accordion',  icon: 'fa-solid fa-angle-down',        path: '/components/coer-accordion',  secuence: 0   },
            {   label: 'Button',     icon: 'bi bi-hand-index-thumb',        path: '/components/coer-button',     secuence: 0   },
            {   label: 'Checkbox',   icon: 'fa-regular fa-square-check',    path: '/components/coer-checkbox',   secuence: 0   },
            {   label: 'Datebox',    icon: 'fa-solid fa-calendar-days',     path: '/components/coer-datebox',    secuence: 0   },
            {   label: 'Dropdown',   icon: 'fa-solid fa-square-caret-down', path: '/components/coer-dropdown',   secuence: 0   },
            {   label: 'Filebox',    icon: 'bi bi-file-earmark-arrow-up',   path: '/components/coer-filebox',    secuence: 0   },
            {   label: 'Form',       icon: 'fa-solid fa-file-invoice',      path: '/components/coer-form',       secuence: 0   },
            {   label: 'Grid',       icon: 'fa-solid fa-table-cells',       path: '/components/coer-grid',       secuence: 0   },
            {   label: 'List',       icon: 'fa-regular fa-rectangle-list',  path: '/components/coer-list',       secuence: 0   },
            {   label: 'Modal',      icon: 'bi bi-window',                  path: '/components/coer-modal',      secuence: 0   },
            {   label: 'Numberbox',  icon: 'fa-solid fa-hashtag',           path: '/components/coer-numberbox',  secuence: 0   },
            {   label: 'Page Title', icon: 'bi bi-signpost-fill',           path: '/components/coer-page-title', secuence: 0   },
            {   label: 'Secretbox',  icon: 'fa-solid fa-eye-slash',         path: '/components/coer-secretbox',  secuence: 0   },
            {   label: 'Selectbox',  icon: 'fa-solid fa-caret-down',        path: '/components/coer-selectbox',  secuence: 0   },
            {   label: 'Switch',     icon: 'fa-solid fa-toggle-off',        path: '/components/coer-switch',     secuence: 0   },
            {   label: 'Tab',        icon: 'bi bi-segmented-nav',           path: '/components/coer-tab',        secuence: 0   },
            {   label: 'Text Area',  icon: 'bi bi-textarea-resize',         path: '/components/coer-textarea',   secuence: 0   },
            {   label: 'Textbox',    icon: 'bi bi-input-cursor-text',       path: '/components/coer-textbox',    secuence: 0   }
        ]
    },

    {  label: 'Interfaces', icon: 'fa-solid fa-t', path: '/interfaces', secuence: 0   },

    // Test   
    {   label: 'Test', icon: 'fa-solid fa-flask-vial', path: '/test', secuence: 0   },
];