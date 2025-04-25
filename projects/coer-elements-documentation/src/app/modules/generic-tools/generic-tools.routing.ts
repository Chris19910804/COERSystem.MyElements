import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pageGuard } from 'coer-elements/guards';

//Pages  
import { BreadcrumbsPage  } from './pages/breadcrumbs/breadcrumbs.component';
import { ColorsPage       } from './pages/colors/colors.component';
import { ControlValuePage } from './pages/control-value/control-value.component';
import { DateTimePage     } from './pages/date-time/date-time.component';
import { ElementsHTMLPage } from './pages/elements-html/elements-html.component';
import { FilesPage        } from './pages/files/files.component';
import { FiltersPage      } from './pages/filters/filters.component';
import { MenuPage         } from './pages/menu/menu.component';
import { PagePage         } from './pages/page/page.component';
import { ScreenPage       } from './pages/screen/screen.component';
import { SectionPage      } from './pages/section/section.component';
import { ServicePage      } from './pages/service/service.component';
import { SourcePage       } from './pages/source/source.component';
import { ToolsPage        } from './pages/tools/tools.component';
import { UserPage         } from './pages/user/user.component';

const routes: Routes = [{
    path: '',
    data: { project: 'MySystem', module: 'Catalogs', submodule: 'Generic Tools' },
    children: [ 
        { path: 'breadcrumbs',   component: BreadcrumbsPage,  data: { page: 'Breadcrumbs'   }},
        { path: 'colors',        component: ColorsPage,       data: { page: 'Colors'        }},
        { path: 'control-value', component: ControlValuePage, data: { page: 'Control Value' }},
        { path: 'date-time',     component: DateTimePage,     data: { page: 'Date Time'     }},
        { path: 'elements-html', component: ElementsHTMLPage, data: { page: 'Elements HTML' }},
        { path: 'files',         component: FilesPage,        data: { page: 'Files'         }},
        { path: 'filters',       component: FiltersPage,      data: { page: 'Filters'       }},
        { path: 'menu',          component: MenuPage,         data: { page: 'Menu'          }},
        { path: 'page',          component: PagePage,         data: { page: 'Page'          }},
        { path: 'screen',        component: ScreenPage,       data: { page: 'Screen'        }},
        { path: 'section',       component: SectionPage,      data: { page: 'Section'       }},
        { path: 'service',       component: ServicePage,      data: { page: 'Service'       }},
        { path: 'source',        component: SourcePage,       data: { page: 'Source'        }},
        { path: 'tools',         component: ToolsPage,        data: { page: 'Tools'         }},
        { path: 'user',          component: UserPage,         data: { page: 'User'          }} 
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GenericToolsRouting { }