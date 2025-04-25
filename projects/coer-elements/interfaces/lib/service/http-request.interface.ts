import { HttpHeaders, HttpParams } from "@angular/common/http";
import { IPatch } from "./patch.interface";

export interface IHttpRequest<T> {
    url: string;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
    body?: T | IPatch[] | {};
    queryParams?: HttpParams;
    headers?: HttpHeaders;
    alertSuccess?: string;
    alertError?: string;
}