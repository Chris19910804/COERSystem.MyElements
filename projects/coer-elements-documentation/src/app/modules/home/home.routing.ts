//Pages 
import { ROUTES as COER_ELEMENTS_ROUTES } from 'coer-elements/pages';
import { InstallPage } from './pages/install/install.component';
import { InterfacesPage } from './pages/interfaces/interfaces.component';
import { ScaffoldPage } from './pages/scaffold/scaffold.component';
import { TestPage } from './pages/test/test.component';

export const ROUTES: any = [
    { path: 'install',    component: InstallPage,    data: { page: 'Install'    }},
    { path: 'interfaces', component: InterfacesPage, data: { page: 'Interfaces' }},
    { path: 'scaffold',   component: ScaffoldPage,   data: { page: 'Scaffold'   }}, 
    { path: 'test',       component: TestPage,       data: { page: 'Test'       }}, 
].concat(COER_ELEMENTS_ROUTES); 