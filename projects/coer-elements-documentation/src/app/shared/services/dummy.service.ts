import { Injectable } from '@angular/core';
import { Service } from 'coer-elements/tools';
import { HttpParams } from '@angular/common/http';
import environment from '@Config/Environment'; 

@Injectable({
    providedIn: 'root'
})
export class DummyService extends Service {
    
    private readonly controller = `${environment.webAPI.mySystem}/api/Dummy`;  

    /** HTTP GET */
    public GetDataDummy(rows: number) {
        return new Promise<any>(async (Resolve, Reject) => {
            
            const response = await this.HTTP_GET<any[]>({
                url: `${this.controller}/GetDataDummy`,
                queryParams: new HttpParams()
                    .set('rows', rows), 
                alertError: 'GetDataDummy'
            });

            response.ok ? Resolve(response.body) : Reject(response.message);
        });
    }
}