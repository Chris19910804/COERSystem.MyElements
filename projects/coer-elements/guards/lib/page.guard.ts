import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CoerAlert, Menu, Tools } from 'coer-elements/tools'; 

export const pageGuard: CanActivateFn = (route: any, state: any) => {   
 
  const module    = Tools.CleanUpBlanks(Tools.RemoveAccents(Tools.AvoidNull<string>(route.data?.module,    'string')));
  const submodule = Tools.CleanUpBlanks(Tools.RemoveAccents(Tools.AvoidNull<string>(route.data?.submodule, 'string')));
  const page      = Tools.CleanUpBlanks(Tools.RemoveAccents(Tools.AvoidNull<string>(route.data?.page,      'string')));  
  
  if (Tools.IsOnlyWhiteSpace(page)) { 
    console.log(`[Page] Metadata for route ${state.url} is missing`);
    inject(CoerAlert).Warning('Metadata is missing', 'Guard', 'fa-solid fa-file-shield');
    return false;
  }

  //Has access? 
  return Menu.GetMenuAccess().some(access => 
    Tools.CleanUpBlanks(Tools.RemoveAccents(Tools.AvoidNull<string>(access?.module, 'string').toUpperCase())) === module.toUpperCase()
    && Tools.CleanUpBlanks(Tools.RemoveAccents(Tools.AvoidNull<string>(access?.submodule, 'string').toUpperCase())) === submodule.toUpperCase()
    && Tools.CleanUpBlanks(Tools.RemoveAccents(Tools.AvoidNull<string>(access?.page, 'string').toUpperCase())) === page.toUpperCase()
  );
}; 