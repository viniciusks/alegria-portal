import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Kit } from '../models/kit';

@Injectable()
export class KitService {
  urlPlayer: string;
  urlFunction: string;

  constructor(private _http: HttpClient) {
    this.urlPlayer = environment.apiPlayer;
    this.urlFunction = environment.apiFunction;
  }

  getKits(): Observable<Kit[]> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get<Kit[]>(`${this.urlFunction}/kits`, {
      headers: headers,
    });
  }

  getOneKit(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get<Kit[]>(`${this.urlFunction}/kits/${id}`, {
      headers: headers,
      observe: 'response',
    });
  }

  insertKit(kit: any): Observable<any> {
    let params = JSON.stringify(kit);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(`${this.urlFunction}/kits`, params, {
      headers: headers,
    });
  }

  updateKit(id: string, kit: any): Observable<any> {
    let params = JSON.stringify(kit);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(`${this.urlFunction}/kits/${id}`, params, {
      headers: headers,
    });
  }

  deleteKit(id: string): Observable<any> {
    return this._http.delete(`${this.urlFunction}/kits/${id}`, {
      observe: 'response',
    });
  }
}
