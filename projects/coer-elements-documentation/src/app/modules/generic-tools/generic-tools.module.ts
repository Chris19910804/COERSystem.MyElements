//Modules
import { NgModule            } from '@angular/core';
import { GenericToolsRouting } from './generic-tools.routing'; 
import { SharedModule } from '../../shared/shared.module';

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
import { UserPage         } from './pages/user/user.component';
import { ToolsPage        } from './pages/tools/tools.component'; 

@NgModule({
    imports: [GenericToolsRouting, SharedModule],
    declarations: [ 
        BreadcrumbsPage,
        ColorsPage,
        ControlValuePage,
        DateTimePage,
        ElementsHTMLPage,
        FilesPage,
        FiltersPage,
        MenuPage,
        PagePage,
        ScreenPage,
        SectionPage,
        ServicePage,
        SourcePage,
        ToolsPage,
        UserPage
    ]
})
export class GenericToolsModule { }