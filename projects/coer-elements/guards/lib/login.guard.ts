import { CanActivateFn } from '@angular/router';
import { User } from 'coer-elements/tools';

export const loginGuard: CanActivateFn = () => { 
  return User.LogIn();
};