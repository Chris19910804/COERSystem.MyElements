import { NgModule } from '@angular/core';    
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//Pages 
import { CoerMenuPage } from './coer-menu/coer-menu.component';
import { ComponentsModule } from 'coer-elements/components';
import { DirectivesModule } from 'coer-elements/directives';
import { HomePage } from './home/home.component';
import { LoadingPage } from './coer-loading/loading.component';
import { COERSystem } from './coer-system/coer-system.component';
import { LoginPage } from './coer-system/login/login.component';
import { CoerAlert } from 'coer-elements/tools';

export const ROUTES: any = [ 
    { path: 'menu',    component: CoerMenuPage, data: { Page: 'COER' }},
    { path: 'loading', component: LoadingPage,  data: { Page: 'COER' }},
    { path: 'home',    component: HomePage,     data: { Page: 'COER' }},
    { path: '**', redirectTo: '/home' }     
];

@NgModule({    
    imports: [
        CommonModule, 
        RouterModule, 
        FormsModule, 
        ComponentsModule, 
        DirectivesModule,
        CoerAlert
    ],
    declarations: [
        COERSystem,
        LoginPage,
        CoerMenuPage,
        HomePage,
        LoadingPage,
    ],
    exports: [ 
        COERSystem, 
        CoerMenuPage,
        HomePage,
        LoadingPage,
    ]
})
export class PagesModule { }