//Modules
import { NgModule } from '@angular/core';
import { ComponentsRoutingModule } from './components.routing'; 
import { SharedModule } from '../../shared/shared.module';

//Pages
import { CoerAccordionPage } from './pages/coer-accordion/coer-accordion.component';
import { CoerButtonPage } from './pages/coer-button/coer-button.component';
import { CoerCheckboxPage } from './pages/coer-checkbox/coer-checkbox.component';
import { CoerDateboxPage } from './pages/coer-datebox/coer-datebox.component';
import { CoerDropdownPage } from './pages/coer-dropdown/coer-dropdown.component';
import { CoerFileboxPage } from './pages/coer-filebox/coer-filebox.component';
import { CoerFormPage } from './pages/coer-form/coer-form.component';
import { CoerGridPage } from './pages/coer-grid/coer-grid.component';
import { CoerListPage } from './pages/coer-list/coer-list.component';
import { CoerModalPage } from './pages/coer-modal/coer-modal.component';
import { CoerNumberboxPage } from './pages/coer-numberbox/coer-numberbox.component';
import { CoerPageTitlePage } from './pages/coer-page-title/coer-page-title.component';
import { CoerSecretBoxPage } from './pages/coer-secretbox/coer-secretbox.component';
import { CoerSelectboxPage } from './pages/coer-selectbox/coer-selectbox.component';
import { CoerSwitchPage } from './pages/coer-switch/coer-switch.component';
import { CoerTabPage } from './pages/coer-tab/coer-tab.component';
import { CoerTextareaPage } from './pages/coer-textarea/coer-textarea.component';
import { CoerTextboxPage } from './pages/coer-textbox/coer-textbox.component';
 
@NgModule({
    declarations: [
        CoerAccordionPage,
        CoerButtonPage,
        CoerCheckboxPage,
        CoerDateboxPage,
        CoerDropdownPage,
        CoerFileboxPage,
        CoerFormPage,
        CoerGridPage,
        CoerListPage,
        CoerModalPage,
        CoerNumberboxPage,
        CoerPageTitlePage,
        CoerSecretBoxPage,
        CoerSelectboxPage,
        CoerSwitchPage,
        CoerTabPage,
        CoerTextareaPage,
        CoerTextboxPage,
    ],
    imports: [SharedModule, ComponentsRoutingModule]
})
export class ComponentsModule { }