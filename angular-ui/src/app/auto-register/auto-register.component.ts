import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-auto-register',
  templateUrl: './auto-register.component.html',
  styleUrls: ['./auto-register.component.css'],
})
export class AutoRegisterComponent implements OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  autoRegister(): void {
    // Add user/password, role(s): user
    this.authService.autoRegister("user", "user@email.com", "password", ["user"]).subscribe(
      (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      (err) => {
        this.errorMessage = err.error.message;
        if (this.errorMessage === 'Error: Username is already taken!') {
          this.errorMessage = 'User(s) Already Registered - Go Ahead and Login!';
        }
        this.isSignUpFailed = true;
      }
    );
    // Add admin/password, role(s): admin
    this.authService.autoRegister("admin", "admin@email.com", "password", ["admin"]).subscribe(
      (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      (err) => {
        this.errorMessage = err.error.message;
        if (this.errorMessage === 'Error: Username is already taken!') {
          this.errorMessage = 'User(s) Already Registered - Go Ahead and Login!';
        }
        this.isSignUpFailed = true;
      }
    );
    // Add mod/password, role(s): mod
    this.authService.autoRegister("mod", "mod@email.com", "password", ["mod"]).subscribe(
      (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      (err) => {
        this.errorMessage = err.error.message;
        if (this.errorMessage === 'Error: Username is already taken!') {
          this.errorMessage = 'User(s) Already Registered - Go Ahead and Login!';
        }
        this.isSignUpFailed = true;
      }
    );
    // Add super/password, role(s): user, admin, mod
    this.authService.autoRegister("super", "super@email.com", "password", ["user","admin","mod"]).subscribe(
      (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      (err) => {
        this.errorMessage = err.error.message;
        if (this.errorMessage === 'Error: Username is already taken!') {
          this.errorMessage = 'User(s) Already Registered - Go Ahead and Login!';
        }
        this.isSignUpFailed = true;
      }
    );
  }
}
