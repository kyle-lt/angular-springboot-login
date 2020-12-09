import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UUID } from 'angular2-uuid';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://host.docker.internal:8082/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {}

  getPublicContent(): Observable<any> {
    // Create UUID for correlationId - this is ephemeral, so just create in local scope and lose afterwards - doesn't matter
    let correlationId = UUID.UUID();
    // Unlike sessionId which we saved in SessionStorage, and we can just grab here
    let sessionId = this.tokenStorageService.getSession();
    console.log("correlationId = " + correlationId);
    console.log("sessionId = " + sessionId);
    return this.http.get(AUTH_API + 'all', { 
      headers: { 'correlationId': correlationId, 'sessionId': sessionId },
      params: { 'correlationIdParam': correlationId, 'sessionIdParam': sessionId },
      responseType: 'text' });
  }

  login(credentials: { username: any; password: any }): Observable<any> {
    // Create UUID for correlationId - this is ephemeral, so just create in local scope and lose afterwards - doesn't matter
    let correlationId = UUID.UUID();
    // Unlike sessionId which we saved in SessionStorage, and we can just grab here
    let sessionId = this.tokenStorageService.getSession();
    console.log("correlationId = " + correlationId);
    console.log("sessionId = " + sessionId);
    return this.http.post(
      AUTH_API + 'signin',
      {
        username: credentials.username,
        password: credentials.password,
      },
      { 
        headers: { 'correlationId': correlationId, 'sessionId': sessionId, 'Content-Type': 'application/json' },
        params: { 'correlationIdParam': correlationId, 'sessionIdParam': sessionId } 
      }
    );
  }

  register(user: {
    username: any;
    email: any;
    password: any;
  }): Observable<any> {
    // Create UUID for correlationId - this is ephemeral, so just create in local scope and lose afterwards - doesn't matter
    let correlationId = UUID.UUID();
    // Unlike sessionId which we saved in SessionStorage, and we can just grab here
    let sessionId = this.tokenStorageService.getSession();
    console.log("correlationId = " + correlationId);
    console.log("sessionId = " + sessionId);
    return this.http.post(
      AUTH_API + 'signup',
      {
        username: user.username,
        email: user.email,
        password: user.password,
      },
      { 
        headers: { 'correlationId': correlationId, 'sessionId': sessionId, 'Content-Type': 'application/json' },
        params: { 'correlationIdParam': correlationId, 'sessionIdParam': sessionId } 
      }
    );
  }

  autoLogin(user: string): Observable<any> {
    // Create UUID for correlationId - this is ephemeral, so just create in local scope and lose afterwards - doesn't matter
    let correlationId = UUID.UUID();
    // Unlike sessionId which we saved in SessionStorage, and we can just grab here
    let sessionId = this.tokenStorageService.getSession();
    console.log("correlationId = " + correlationId);
    console.log("sessionId = " + sessionId);
    if (user === 'user') {
      return this.http.post(
        AUTH_API + 'signin',
        {
          username: 'user',
          password: 'password',
        },
        { 
          headers: { 'correlationId': correlationId, 'sessionId': sessionId, 'Content-Type': 'application/json' },
          params: { 'correlationIdParam': correlationId, 'sessionIdParam': sessionId } 
        }
      );
    } else if (user === 'admin') {
      return this.http.post(
        AUTH_API + 'signin',
        {
          username: 'admin',
          password: 'password',
        },
        { 
          headers: { 'correlationId': correlationId, 'sessionId': sessionId, 'Content-Type': 'application/json' },
          params: { 'correlationIdParam': correlationId, 'sessionIdParam': sessionId } 
        }
      );
    } else if (user === 'mod') {
      return this.http.post(
        AUTH_API + 'signin',
        {
          username: 'mod',
          password: 'password',
        },
        { 
          headers: { 'correlationId': correlationId, 'sessionId': sessionId, 'Content-Type': 'application/json' },
          params: { 'correlationIdParam': correlationId, 'sessionIdParam': sessionId } 
        }
      );
    } else {
      return this.http.post(
        AUTH_API + 'signin',
        {
          username: 'super',
          password: 'password',
        },
        { 
          headers: { 'correlationId': correlationId, 'sessionId': sessionId, 'Content-Type': 'application/json' },
          params: { 'correlationIdParam': correlationId, 'sessionIdParam': sessionId } 
        }
      );
    }
  }

  autoRegister(
    uname: string,
    emailAddress: string,
    pass: string,
    roles: string[]
  ): Observable<any> {
    // Create UUID for correlationId - this is ephemeral, so just create in local scope and lose afterwards - doesn't matter
    let correlationId = UUID.UUID();
    // Unlike sessionId which we saved in SessionStorage, and we can just grab here
    let sessionId = this.tokenStorageService.getSession();
    console.log("correlationId = " + correlationId);
    console.log("sessionId = " + sessionId);
    return this.http.post(
      AUTH_API + 'signup',
      {
        username: uname,
        email: emailAddress,
        password: pass,
        role: roles,
      },
      { 
        headers: { 'correlationId': correlationId, 'sessionId': sessionId, 'Content-Type': 'application/json' },
        params: { 'correlationIdParam': correlationId, 'sessionIdParam': sessionId } 
      }
    );
  }
}
