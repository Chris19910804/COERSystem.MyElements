import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { UTC_OFFSET_INTERCEPTOR } from './lib/utc-offset.interceptor';
import { USER_INTERCEPTOR } from './lib/user.interceptor';

export const INTERCEPTORS: any[] = [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: UTC_OFFSET_INTERCEPTOR, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: USER_INTERCEPTOR, multi: true }
];