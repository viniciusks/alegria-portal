import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class UtilsService {
  public apiIbge: string;

  constructor(private _http: HttpClient) {
    this.apiIbge = GLOBAL.apiIbge;
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
}
