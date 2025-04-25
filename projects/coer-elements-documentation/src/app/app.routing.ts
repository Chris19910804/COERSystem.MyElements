import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { ROUTES } from './modules/home/home.routing';

export const routes: Routes = [
    {
        path: 'components',
        loadChildren: () => import('./modules/components/components.module').then(module => module.ComponentsModule)
    },
    { 
        path: 'generic-tools', 
        loadChildren: () => import('./modules/generic-tools/generic-tools.module').then(submodule => submodule.GenericToolsModule) 
    },
].concat(ROUTES);

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule { }