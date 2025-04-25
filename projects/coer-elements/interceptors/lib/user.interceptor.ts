import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tools, User } from 'coer-elements/tools';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class USER_INTERCEPTOR implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const user  = User.Get();
        let headers = request.headers;

        if (user) {
            if (Tools.IsNotNull(user?.user)) {
                headers = headers.set('clien-user', user.user);       

            }

            if (Tools.IsNotNull(user?.jwt)) {
                headers = headers.set('Authorization', `Bearer ${user.jwt}`);
            }
        }

        return next.handle(request.clone({ headers })).pipe(
            catchError((httpError: HttpErrorResponse) => {
                console.error(httpError);
                return throwError(() => httpError);
            })
        );
    }
}