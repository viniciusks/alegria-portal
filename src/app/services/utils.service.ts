import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { environment } from 'src/environments/environment';

@Injectable()
export class UtilsService {
  private apiIbge: string;
  private urlFunction: string;

  constructor(private _http: HttpClient) {
    this.apiIbge = GLOBAL.apiIbge;
    this.urlFunction = environment.apiFunction;
  }

  getStates(): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this._http.get(`${this.apiIbge}/estados`, { headers: headers });
  }

  getCities(uf: string): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this._http.get(`${this.apiIbge}/estados/${uf}/municipios`, {
      headers: headers,
    });
  }

  uploadFiles(body: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this._http.post(`${this.urlFunction}/files`, body, {
      headers
    })
  }
}
