import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const SESSION_KEY = 'sessionId';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)!;
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY)!);
  }

  public saveSession(token: string): void {
    window.sessionStorage.removeItem(SESSION_KEY);
    window.sessionStorage.setItem(SESSION_KEY, token);
  }

  public getSession(): string {
    return sessionStorage.getItem(SESSION_KEY)!;
  }

  public endSession(): void {
    window.sessionStorage.removeItem(SESSION_KEY);
  }

}
