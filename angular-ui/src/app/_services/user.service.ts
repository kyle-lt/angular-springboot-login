import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UUID } from 'angular2-uuid';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://host.docker.internal:8082/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  getPublicContent(): Observable<any> {
    // Create UUID for correlationId - this is ephemeral, so just create in local scope and lose afterwards - doesn't matter
    let correlationId = UUID.UUID();
    // Unlike sessionId which we saved in SessionStorage, and we can just grab here
    let sessionId = this.tokenStorageService.getSession();
    console.log("correlationId = " + correlationId);
    console.log("sessionId = " + sessionId);
    return this.http.get(API_URL + 'all', { 
      headers: { 'correlationId': correlationId, 'sessionId': sessionId },
      params: { 'correlationIdParam': correlationId, 'sessionIdParam': sessionId },
      responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    // Create UUID for correlationId - this is ephemeral, so just create in local scope and lose afterwards - doesn't matter
    let correlationId = UUID.UUID();
    // Unlike sessionId which we saved in SessionStorage, and we can just grab here
    let sessionId = this.tokenStorageService.getSession();
    console.log("correlationId = " + correlationId);
    console.log("sessionId = " + sessionId);
    return this.http.get(API_URL + 'user', { 
      headers: { 'correlationId': correlationId, 'sessionId': sessionId },
      params: { 'correlationIdParam': correlationId, 'sessionIdParam': sessionId },
      responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    // Create UUID for correlationId - this is ephemeral, so just create in local scope and lose afterwards - doesn't matter
    let correlationId = UUID.UUID();
    // Unlike sessionId which we saved in SessionStorage, and we can just grab here
    let sessionId = this.tokenStorageService.getSession();
    console.log("correlationId = " + correlationId);
    console.log("sessionId = " + sessionId);
    return this.http.get(API_URL + 'mod', { 
      headers: { 'correlationId': correlationId, 'sessionId': sessionId },
      params: { 'correlationIdParam': correlationId, 'sessionIdParam': sessionId },
      responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    // Create UUID for correlationId - this is ephemeral, so just create in local scope and lose afterwards - doesn't matter
    let correlationId = UUID.UUID();
    // Unlike sessionId which we saved in SessionStorage, and we can just grab here
    let sessionId = this.tokenStorageService.getSession();
    console.log("correlationId = " + correlationId);
    console.log("sessionId = " + sessionId);
    return this.http.get(API_URL + 'admin', { 
      headers: { 'correlationId': correlationId, 'sessionId': sessionId },
      params: { 'correlationIdParam': correlationId, 'sessionIdParam': sessionId },
      responseType: 'text' });
  }
}
