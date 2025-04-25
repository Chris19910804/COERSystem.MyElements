import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from '../app/app.routing'; 
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { INTERCEPTORS } from 'coer-elements/interceptors';
import { CoerAlert } from 'coer-elements/tools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withHashLocation()), 
    provideHttpClient(),
    provideAnimationsAsync(),
    CoerAlert,
  ].concat(INTERCEPTORS)
};