import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course/course';

@Injectable()
export class CourseService {
  urlPlayer: string;
  urlFunction: string;

  constructor(private _http: HttpClient) {
    this.urlPlayer = environment.apiPlayer;
    this.urlFunction = environment.apiFunction;
  }

  getCourses(): Observable<Course[]> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get<Course[]>(`${this.urlFunction}/courses`, {
      headers: headers,
    });
  }

  getOneCourse(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get<Course[]>(`${this.urlFunction}/courses/${id}`, {
      headers: headers,
      observe: 'response',
    });
  }

  insertCourse(course: any): Observable<any> {
    let params = JSON.stringify(course);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(`${this.urlFunction}/courses`, params, {
      headers: headers,
    });
  }

  updateCourse(id: string, course: any): Observable<any> {
    let params = JSON.stringify(course);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(`${this.urlFunction}/courses/${id}`, params, {
      headers: headers,
    });
  }

  deleteCourse(id: string): Observable<any> {
    return this._http.delete(`${this.urlFunction}/courses/${id}`, {
      observe: 'response',
    });
  }
}
