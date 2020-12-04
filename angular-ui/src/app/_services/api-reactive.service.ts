import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://host.docker.internal:8082/api/reactive/';

@Injectable({
  providedIn: 'root'
})
export class ApiReactiveService {

  constructor(private http: HttpClient) { }

  getPublicApi(): Observable<any> {
    return this.http.get(API_URL + 'public', { responseType: 'text' });
  }

  getAdminApi(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getModApi(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }
}
