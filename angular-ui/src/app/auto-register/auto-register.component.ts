import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-auto-register',
  templateUrl: './auto-register.component.html',
  styleUrls: ['./auto-register.component.css']
})
export class AutoRegisterComponent implements OnInit {

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  autoRegister(): void {
    this.authService.autoRegister().subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        if (this.errorMessage === "Error: Username is already taken!") {
          this.errorMessage = "User Already Registered - Go Ahead and Login!";
        }
        this.isSignUpFailed = true;
      }
    );
  }

}
