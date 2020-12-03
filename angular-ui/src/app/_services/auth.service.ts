import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://host.docker.internal:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: { username: any; password: any }): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username: credentials.username,
        password: credentials.password,
      },
      httpOptions
    );
  }

  register(user: {
    username: any;
    email: any;
    password: any;
  }): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username: user.username,
        email: user.email,
        password: user.password,
      },
      httpOptions
    );
  }

  autoLogin(user: string): Observable<any> {
    if (user === 'user') {
      return this.http.post(
        AUTH_API + 'signin',
        {
          username: 'user',
          password: 'password',
        },
        httpOptions
      );
    } else if (user === 'admin') {
      return this.http.post(
        AUTH_API + 'signin',
        {
          username: 'admin',
          password: 'password',
        },
        httpOptions
      );
    } else if (user === 'mod') {
      return this.http.post(
        AUTH_API + 'signin',
        {
          username: 'mod',
          password: 'password',
        },
        httpOptions
      );
    } else {
      return this.http.post(
        AUTH_API + 'signin',
        {
          username: 'super',
          password: 'password',
        },
        httpOptions
      );
    }
  }

  autoRegister(
    uname: string,
    emailAddress: string,
    pass: string,
    roles: string[]
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username: uname,
        email: emailAddress,
        password: pass,
        role: roles,
      },
      httpOptions
    );
  }
}
