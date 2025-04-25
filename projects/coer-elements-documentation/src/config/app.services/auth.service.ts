import { Injectable } from '@angular/core';
import { Service, User } from 'coer-elements/tools';
import { ILogIn, IMenu } from 'coer-elements/interfaces';
import { IUserLoginResponse } from '@Config/Interfaces';
import { HttpParams } from '@angular/common/http';
import environment from '@Config/Environment'; 

@Injectable({
    providedIn: 'root'
})
export class AuthService extends Service {

    private readonly AuthController = `${environment.webAPI.mySystem}/api/Auth`; 
    private readonly NavigationController = `${environment.webAPI.mySystem}/api/Navigation`;

    /** HTTP POST */
    public LogIn(logIn: ILogIn) {
        return new Promise<IUserLoginResponse>(async (Resolve, Reject) => {

            const response = await this.HTTP_POST<IUserLoginResponse>({
                url: `${this.AuthController}/LogIn`,
                body: logIn, 
                alertError: 'LogIn'
            });

            response.ok ? Resolve(response.body) : Reject(response.message);
        });
    } 


    /** HTTP POST */
    public RecoveryPassword(recovery: string) {
        return new Promise<string>(async (Resolve, Reject) => {

            const response = await this.HTTP_POST<{ message: string }>({
                url: `${this.AuthController}/RecoveryPassword/${recovery}`,
                body: {}, 
                alertError: 'RecoveryPassword'
            });

            response.ok ? Resolve(response.body.message) : Reject(response.message);
        });
    } 


    /** HTTP POST */
    public SetPassword(logIn: ILogIn) {
        return new Promise<void>(async (Resolve, Reject) => {

            const response = await this.HTTP_POST<void>({
                url: `${this.AuthController}/SetPassword`,
                body: logIn, 
                alertError: 'SetPassword'
            });

            response.ok ? Resolve(response.body) : Reject(response.message);
        });
    } 


    /** HTTP PUT */
    public UpdateJWT() {
        return new Promise<string>(async (Resolve, Reject) => {

            const response = await this.HTTP_PUT<string>({
                url: `${this.AuthController}/UpdateJWT`,
                body: {}, 
                responseType: 'text',
                alertError: 'UpdateJWT'
            }, false);  

            response.ok ? Resolve(response.text) : Reject(response.message);
        });
    }   


    /** HTTP GET */
    public GetNavigationByRole(project: string, role: string) {
        return new Promise<IMenu[]>(async (Resolve, Reject) => {
            const response = await this.HTTP_GET<IMenu[]>({
                url: `${this.NavigationController}/GetNavigationByRole`,
                queryParams: new HttpParams()
                    .set('project', project)
                    .set('role', role),
                alertError: 'GetNavigationByRole'
            });

            if(response.status == this.httpCode.Unauthorize) {
                User.LogOut();
            }
            
            response.ok ? Resolve(response.body) : Reject(response.message);
        });
    }
}