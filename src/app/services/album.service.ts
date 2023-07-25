import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album } from '../models/album';

@Injectable()
export class AlbumService {
  urlPlayer: string;
  urlFunction: string;

  constructor(private _http: HttpClient) {
    this.urlPlayer = environment.apiPlayer;
    this.urlFunction = environment.apiFunction;
  }

  getAlbums(): Observable<Album[]> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get<Album[]>(`${this.urlFunction}/albums`, {
      headers: headers,
    });
  }

  getOneAlbum(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get<Album[]>(`${this.urlFunction}/albums/${id}`, {
      headers: headers,
      observe: 'response',
    });
  }

  insertAlbum(album: any): Observable<any> {
    let params = JSON.stringify(album);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(`${this.urlFunction}/albums`, params, {
      headers: headers,
    });
  }

  updateAlbum(id: string, album: any): Observable<any> {
    let params = JSON.stringify(album);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(`${this.urlFunction}/albums/${id}`, params, {
      headers: headers,
    });
  }

  deleteAlbum(id: string): Observable<any> {
    return this._http.delete(`${this.urlFunction}/albums/${id}`, {
      observe: 'response',
    });
  }
}
