import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateTime } from 'coer-elements/tools';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UTC_OFFSET_INTERCEPTOR implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const headers = request.headers.set('utc-offset', `${DateTime.GetOffset() / 60}`);       

        return next.handle(request.clone({ headers })).pipe(
            catchError((httpError: HttpErrorResponse) => {
                console.error(httpError);
                return throwError(() => httpError);
            })
        );
    }
}