//Modules
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router'; 
import { CoerElementsModule } from 'projects/coer-elements';

//Components 
import { DocumentationComponent } from './components/documentation/documentation.component';
import { DocumentationTestsComponent } from './components/documentation/documentation-tests/documentation-tests.component';
import { DocumentationOptionsComponent } from './components/documentation/documentation-options/documentation-options.component';
import { DocumentationInformationComponent } from './components/documentation/documentation-information/documentation-information.component';
 

@NgModule({
    declarations: [
        DocumentationComponent,
        DocumentationTestsComponent,
        DocumentationOptionsComponent,
        DocumentationInformationComponent,
    ],
    imports: [
        RouterOutlet,
        RouterModule, 
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CoerElementsModule,
    ],
    exports: [
        RouterModule, 
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CoerElementsModule,
        DocumentationComponent
    ]
})
export class SharedModule { }