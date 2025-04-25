import { NgModule } from '@angular/core';   
import 'coer-elements/extensions';

//Components  
import { CoerAlert }   from 'coer-elements/tools';
import * as components from 'coer-elements/components';
import * as pages      from 'coer-elements/pages';
import * as directives from 'coer-elements/directives';
import * as pipes      from 'coer-elements/pipes'; 
import * as services   from 'coer-elements/services';


@NgModule({  
    imports: [  
        components.ComponentsModule, 
        pages.PagesModule,
        directives.DirectivesModule,
        pipes.PipesModule, 
        services.ServicesModule,
        CoerAlert 
    ],
    exports: [ 
        CoerAlert,
        pages.COERSystem,
        pages.CoerMenuPage,
        pages.HomePage, 
        pages.LoadingPage,
        components.CoerAccordion,
        components.CoerButton,
        components.CoerCheckbox,
        components.CoerDateBox,
        components.CoerFilebox,
        components.CoerForm,
        components.CoerGrid,
        components.CoerList, 
        components.CoerModal,
        components.CoerNumberBox,
        components.CoerPageTitle,
        components.CoerSelectbox,
        components.CoerDropdown,
        components.CoerSidenav,
        components.CoerSwitch,
        components.CoerTextarea,
        components.CoerTab,
        components.CoerTextBox,
        components.CoerToolbar, 
        directives.CoerRefDirective,
        directives.ElementDataDirective,
        directives.LifeCycleDirective,
        pipes.HtmlPipe,
        pipes.NoImagePipe,
        pipes.NumericFormatPipe 
    ]
})
export class CoerElementsModule { } 