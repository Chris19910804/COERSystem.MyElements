import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { IPatch } from 'coer-elements/interfaces';
import { Service } from 'coer-elements/tools';
import environment from '@Config/Environment'; 
import { IImage, IUserIdentity } from '@Config/Interfaces';

@Injectable({
    providedIn: 'root'
})
export class ProfileService extends Service {
 
    private readonly UserIdentityController = `${environment.webAPI.mySystem}/api/UsersIdentity`;
    private readonly UserRoleController     = `${environment.webAPI.mySystem}/api/UsersRole`;
    private readonly ImagesController       = `${environment.webAPI.mySystem}/api/Images`; 


    /** HTTP PATCH */
    public PatchUserIdentity(user: string, patch: IPatch[]) {
        return new Promise<void>(async (Resolve, Reject) => {
            
            const response = await this.HTTP_PATCH<IUserIdentity>({
                url: `${this.UserIdentityController}/PatchUserIdentity/${user}`,
                body: patch,
                alertError: 'PatchUserIdentity'
            });
                
            response.ok ? Resolve(response.body) : Reject(response.message);
        });
    } 
    
    
    /** HTTP PUT */
    public SetMainUsersRole(user: string, role: string) {
        return new Promise<void>(async (Resolve, Reject) => {

            const response = await this.HTTP_PUT<void>({
                url: `${this.UserRoleController}/SetMainUsersRole`,  
                queryParams: new HttpParams()
                    .set('user', user)
                    .set('role', role), 
                alertError: 'SetMainUsersRole'
            });

            response.ok ? Resolve(response.body) : Reject(response.message);
        });
    } 


    /** HTTP GET */
    public GetImagesUser(user: string, onlyMain: boolean = true) {
        return new Promise<IImage[]>(async (Resolve, Reject) => {

            const response = await this.HTTP_GET<IImage[]>({
                url: `${this.ImagesController}/GetImagesUser/${user}`,
                queryParams: new HttpParams().set('onlyMain', onlyMain),
                alertError: 'GetImagesUser'
            });

            response.ok ? Resolve(response.body) : Reject(response.message);
        });
    }
    
    
    /** HTTP POST */
    public UploadImageUser(user: string, image: File) {
        return new Promise<IImage>(async (Resolve, Reject) => {

            const formData = new FormData();
            formData.set('fileCollection', image);

            const response = await this.HTTP_POST<IImage>({
                url: `${this.ImagesController}/UploadImageUser/${user}`,
                body: formData,
                alertError: 'UploadImageUser'
            });

            response.ok ? Resolve(response.body) : Reject(response.message);
        });
    }
    
    
    /** HTTP DELETE */
    public DeleteImageUser(user: string, imageName: string) {
        return new Promise<void>(async (Resolve, Reject) => {

            const response = await this.HTTP_DELETE<IImage>({
                url: `${this.ImagesController}/DeleteImageUser`,
                queryParams: new HttpParams()
                    .set('user', user)
                    .set('imageName', imageName),
                alertError: 'DeleteImageUser'
            })

            response.ok ? Resolve(response.body) : Reject(response.message);
        });
    } 
    
    
    /** HTTP DELETE */
    public DeleteMainImageUser(user: string) {
        return new Promise<void>(async (Resolve, Reject) => {

            const response = await this.HTTP_DELETE<IImage>({
                url: `${this.ImagesController}/DeleteMainImageUser`,
                queryParams: new HttpParams()
                    .set('user', user) ,
                alertError: 'DeleteMainImageUser'
            })

            response.ok ? Resolve(response.body) : Reject(response.message);
        });
    }
}