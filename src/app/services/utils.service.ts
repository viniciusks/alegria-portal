import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class UtilsService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getStates(): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    // headers.set('Authorization', 'Basic Y2xpZW50LWlkOnNlY3JldC1pZA==');

    return this._http.get(this.url + '/oauth/ufs', { headers: headers });
  }

  getCities(uf: string): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this._http.get(this.url + '/oauth/ufs/' + uf + '/municipios', {
      headers: headers,
    });
  }
}
