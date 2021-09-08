import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(
    private http: HttpClient,
    private alert: AlertService
  ) { }

  public post(url: string, data: any, showLoading = true): Observable<any> {
    if (showLoading) { this.alert.initRequest(); }
    return this.http.post(`${environment.baseUrl}${url}`, data);
  }

  public get(url: string, showLoading = true): Observable<any> {
    if (showLoading) { this.alert.initRequest(); }
    return this.http.get(`${environment.baseUrl}${url}`);
  }

  public put(url?: string, data?: any, showLoading = true): Observable<any> {
    if (showLoading) { this.alert.initRequest(); }
    return this.http.put(`${environment.baseUrl}${url}`, data);
  }

  public delete(url?: string, showLoading = true): Observable<any> {
    if (showLoading) { this.alert.initRequest(); }
    return this.http.delete(`${environment.baseUrl}${url}`);
  }

}
