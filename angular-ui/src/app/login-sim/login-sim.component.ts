import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoginSimService } from '../_services/login-sim.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login-sim',
  templateUrl: './login-sim.component.html',
  styleUrls: ['./login-sim.component.css']
})
export class LoginSimComponent implements OnInit {

  errorMessage = '';

  constructor(private loginSimService: LoginSimService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
  }

  // Ugly Code Alert!  Trying to force the async HTTP calls to be called in sequence...
  // And then, once those are definitely done, we'll end the session and refresh the page to create a new session!
  makeLoginCalls(): void {
    this.postAnonymousInvoke().subscribe(
      (data) => {
        console.log("Call to anonymous_invoke done!");
        this.postAuthenticate().subscribe(
          (data) => {
            console.log("Call to authenticate done!");
            this.postAssert().subscribe(
              (data) => {
                console.log("Call to assert done!");
                console.log("All Login-Sim Calls done! In order!");
                this.tokenStorageService.endSession();
                window.location.reload();
              }
            ) 
          }
        )
      }
    )
  }
  
  postAnonymousInvoke(): Observable<any> {
    let result = this.loginSimService.postAnonymousInvoke();
    return result;
  }

  postAuthenticate(): Observable<any> {
    let result = this.loginSimService.postAuthenticate();
   return result;
  }

  postAssert(): Observable<any>  {
    let result = this.loginSimService.postAssert();
   return result;
  }

}
