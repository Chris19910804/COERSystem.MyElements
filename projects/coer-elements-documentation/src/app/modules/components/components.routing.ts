import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  

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

export const routes: Routes = [{
    path: '',
    children: [ 
        { path: 'coer-accordion',  component: CoerAccordionPage, data: { page: 'Accordion'     }},
        { path: 'coer-button',     component: CoerButtonPage,    data: { page: 'Button'        }},
        { path: 'coer-checkbox',   component: CoerCheckboxPage,  data: { page: 'Checkbox'      }},
        { path: 'coer-datebox',    component: CoerDateboxPage,   data: { page: 'Datebox'       }},
        { path: 'coer-dropdown',   component: CoerDropdownPage,  data: { page: 'Dropdown'      }},
        { path: 'coer-filebox',    component: CoerFileboxPage,   data: { page: 'Filebox'       }},
        { path: 'coer-form',       component: CoerFormPage,      data: { page: 'Form'          }},
        { path: 'coer-grid',       component: CoerGridPage,      data: { page: 'Grid'          }},
        { path: 'coer-list',       component: CoerListPage,      data: { page: 'List'          }},
        { path: 'coer-modal',      component: CoerModalPage,     data: { page: 'Modal'         }},
        { path: 'coer-numberbox',  component: CoerNumberboxPage, data: { page: 'Numberbox'     }},
        { path: 'coer-page-title', component: CoerPageTitlePage, data: { page: 'Page Title'    }},
        { path: 'coer-secretbox',  component: CoerSecretBoxPage, data: { page: 'CoerSecretBox' }},
        { path: 'coer-selectbox',  component: CoerSelectboxPage, data: { page: 'Selectbox'     }},
        { path: 'coer-switch',     component: CoerSwitchPage,    data: { page: 'Switch'        }},
        { path: 'coer-tab',        component: CoerTabPage,       data: { page: 'Tab'           }},
        { path: 'coer-textarea',   component: CoerTextareaPage,  data: { page: 'Text Area'     }}, 
        { path: 'coer-textbox',    component: CoerTextboxPage,   data: { page: 'Textbox'       }}
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ComponentsRoutingModule { }