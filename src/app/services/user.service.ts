import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { GLOBAL } from './global';

@Injectable()
export class UserService {
  public apiPlayer: string;
  public apiFunction: string;
  public identity: any;

  constructor(private _http: HttpClient) {
    this.apiPlayer = GLOBAL.apiPlayer;
    this.apiFunction = GLOBAL.apiFunction;
  }

  register(user: User) {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(`${this.apiFunction}/users`, params, {
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

  getUser(): Observable<any> {
    let identity = this.getIdentity();
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(`${this.apiFunction}/users/${identity.uid}`, {
      headers: headers,
      observe: 'response',
    });
  }
}
