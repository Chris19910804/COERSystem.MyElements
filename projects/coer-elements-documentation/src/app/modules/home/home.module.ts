//Modules
import { NgModule } from '@angular/core';  
import { JwtModule } from "@auth0/angular-jwt";
import { User } from 'coer-elements/tools';
import { SharedModule } from '../../shared/shared.module';

//Pages 
import { InstallPage } from './pages/install/install.component';
import { InterfacesPage } from './pages/interfaces/interfaces.component';
import { ScaffoldPage } from './pages/scaffold/scaffold.component';
import { TestPage } from './pages/test/test.component';
 

function TOKEN(): string { 
    return User.Get()?.jwt || '';
}


@NgModule({
    declarations: [
        InstallPage,
        InterfacesPage,
        ScaffoldPage,
        TestPage
    ],
    imports: [
        SharedModule,  
        JwtModule.forRoot({
            config: { 
                tokenGetter: TOKEN,
                allowedDomains: [],
                disallowedRoutes: [],
            }
        })
    ],
    exports: [SharedModule]
})
export class HomeModule { }