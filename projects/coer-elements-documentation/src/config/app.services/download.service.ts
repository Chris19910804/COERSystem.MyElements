import { Injectable } from '@angular/core';
import { Service } from 'coer-elements/tools'; 
import environment from '@Config/Environment';

@Injectable({
    providedIn: 'root'
})
export class DownloadService extends Service {

    private readonly controller = `${environment.webAPI.mySystem}/api/Download`;


    /** HTTP GET */
    public FormatTXT(formatName: string, fileName: string = '') {
        return new Promise<void>(async (Resolve, Reject) => {

            const response = await this.HTTP_GET<ArrayBuffer>({
                url: `${this.controller}/FormatTXT/${formatName}`,
                responseType: 'arraybuffer', 
                alertError: 'FormatTXT'
            });
             
            if(response.ok) {
                this.DOWNLOAD_TXT(response.body, fileName);
                Resolve();
            }

            else {
                Reject(response.message);
            } 
        });
    } 


    /** HTTP GET */
    public FormatCSV(formatName: string, fileName: string = '') {
        return new Promise<void>(async (Resolve, Reject) => {

            const response = await this.HTTP_GET<ArrayBuffer>({
                url: `${this.controller}/FormatCSV/${formatName}`,
                responseType: 'arraybuffer', 
                alertError: 'FormatCSV'
            });

            if(response.ok) {
                this.DOWNLOAD_CSV(response.body, fileName);
                Resolve();
            }

            else {
                Reject(response.message);
            } 
        });
    } 
}