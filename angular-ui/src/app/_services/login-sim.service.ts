import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UUID } from 'angular2-uuid';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://host.docker.internal:8082/api/reactive/';

@Injectable({
  providedIn: 'root'
})
export class LoginSimService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  postAnonymousInvoke(): Observable<any> {
    // Create UUID for correlationId - this is ephemeral, so just create in local scope and lose afterwards - doesn't matter
    let correlationId = UUID.UUID();
    // Unlike sessionId which we saved in SessionStorage, and we can just grab here
    let sessionId = this.tokenStorageService.getSession();
    console.log("correlationId = " + correlationId);
    console.log("sessionId = " + sessionId);
    return this.http.post(API_URL + 'anonymous_invoke', {sessionId, correlationId}, {
      headers: { 'correlationId': correlationId, 'sessionId': sessionId },
      params: { 'correlationIdParam': correlationId, 'sessionIdParam': sessionId },
      responseType: 'text' 
    });
  }

  postAuthenticate(): Observable<any> {
    // Create UUID for correlationId - this is ephemeral, so just create in local scope and lose afterwards - doesn't matter
    let correlationId = UUID.UUID();
    // Unlike sessionId which we saved in SessionStorage, and we can just grab here
    let sessionId = this.tokenStorageService.getSession();
    console.log("correlationId = " + correlationId);
    console.log("sessionId = " + sessionId);
    return this.http.post(API_URL + 'authenticate', {sessionId, correlationId}, {
      headers: { 'correlationId': correlationId, 'sessionId': sessionId },
      params: { 'correlationIdParam': correlationId, 'sessionIdParam': sessionId },
      responseType: 'text' 
    });
  }

  postAssert(): Observable<any> {
    // Create UUID for correlationId - this is ephemeral, so just create in local scope and lose afterwards - doesn't matter
    let correlationId = UUID.UUID();
    // Unlike sessionId which we saved in SessionStorage, and we can just grab here
    let sessionId = this.tokenStorageService.getSession();
    console.log("correlationId = " + correlationId);
    console.log("sessionId = " + sessionId);
    return this.http.post(API_URL + 'assert', {sessionId, correlationId}, {
      headers: { 'correlationId': correlationId, 'sessionId': sessionId },
      params: { 'correlationIdParam': correlationId, 'sessionIdParam': sessionId },
      responseType: 'text' 
    });
  }

}
