// NgZone and OnDestroy for AppD Custom Data Test
import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { UserService } from './_services/user.service';
import { AuthService } from './_services/auth.service';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

// OnDestroy for Appd Custom Data Test
export class AppComponent implements OnInit, OnDestroy {
  private roles: string[] = [] as string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string = "No Username Yet, Login!";
  token: string = "";
  sessionId: string = "";
  //modes: Array<String> = ['public', 'admin', 'mod']

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService, private authService: AuthService, private ngZone: NgZone) {}

  ngOnInit(): void {

    // Create and save new SessionId upon initial page load ONLY
    // Only a logout() will clear the session
    if ( this.tokenStorageService.getSession() ) {
      console.log("Existing Session Found! sessionId = " + this.tokenStorageService.getSession());
    } else {
      let uuid = UUID.UUID();
      console.log("New Session!  sessionId = " + uuid);
      this.tokenStorageService.saveSession(uuid);
    }
    // Assign Session ID to member variable
    this.sessionId = this.tokenStorageService.getSession();

    // For other AppD Custom Data Test
    //(<any>window).myPageVar = "Angular provided this value!";
    (<any>window)['myPageVar'] = "Angular provided this value!";

    // For AppD Custom Data Test
    (<any>window).my = (<any>window).my || {};
    (<any>window).my.namespace = (<any>window).my.namespace || {};
    (<any>window).my.namespace.publicFunc = this.publicFunc.bind(this);

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.token = this.tokenStorageService.getToken();
    if ( this.token == null ) {
      this.token = "No Token Yet, Login!";
    }

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      // Log the username to Console for debug purposes
      console.log("From app.component, user.username = " + user.username);
      // Log the JWT Token to Console for debug purposes
      console.log("From app.component, this.token = " + this.token);

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  // For AppD Custom Data Test
  ngOnDestroy() {
    (<any>window).my.namespace.publicFunc = null;
  }
  publicFunc() {
    this.ngZone.run(() => this.privateFunc());
  }
  privateFunc() {
    console.log("Just called privateFunc!");
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.tokenStorageService.endSession();
    window.location.reload();
  }

  getTestPublicContent(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        console.log("data from /api/test/all: " + data);
      },
      err => {
        console.log('Error HTTP Status Code: ' + JSON.parse(err.error).status + ' | ' + 'Error Message: ' + JSON.parse(err.error).error);
      }
    );
  }

  getAuthPublicContent(): void {
    this.authService.getPublicContent().subscribe(
      data => {
        console.log("data from /api/auth/all: " + data);
      },
      err => {
        console.log('Error HTTP Status Code: ' + JSON.parse(err.error).status + ' | ' + 'Error Message: ' + JSON.parse(err.error).error);
      }
    );
  }
}
