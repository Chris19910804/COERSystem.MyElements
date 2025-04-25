import { signal } from '@angular/core'; 
import { IColors } from 'coer-elements/interfaces';

export const colorsSIGNAL = signal<IColors>({
    fixedColors: {
        blue:   '#0d6efd',
        gray:   '#6c757d',
        green:  '#198754',
        yellow: '#ffc107',
        red:    '#dc3545',
        smoke:  '#f5f5f5',
        black:  '#252525',
        orange: '#fd6031',
        white:  '#ffffff',
        purple: '#a615bc'
    },
    actionColors: {
        primary:     '',
        secondary:   '',
        success:     '',
        warning:     '',
        danger:      '',
        navigation:  '',
        information: ''
    },
    appColors: {
        breadcrumbs:   '',
        background:    '',
        containers:    '',
        sidenav:       '',
        sidenavText:   '',
        sidenavActive: '',
        toolbar:       '', 
        toolbarText:   ''
    }
}); 