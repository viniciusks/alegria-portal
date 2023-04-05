import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { GLOBAL } from './global';

@Injectable()
export class UserService {
  public url: string;
  public identity: any;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  register(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + '/oauth/register', params, {
      headers: headers,
    });
  }

  login(info: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', GLOBAL.authToken);

    let body = {
      email: info.email,
      password: info.password,
    };

    return this._http.post(this.url + '/login', body, {
      headers: headers,
    });
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity') as string);

    if (identity != 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }
}
