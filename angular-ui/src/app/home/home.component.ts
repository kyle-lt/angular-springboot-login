import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ApiReactiveService } from '../_services/api-reactive.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  modes: Array<string> = ['public', 'admin', 'mod'];
  clicked: string = '';
  content: string = '';
  apiResponse: string = '';

  constructor(
    private userService: UserService,
    private apiReactiveService: ApiReactiveService
  ) {}

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      (data) => {
        this.content = data;
      },
      (err) => {
        this.content = JSON.parse(err.error).message;
      }
    );
    this.clicked = '';
  }

  public doStuff(mode: string) {
    console.log('You just clicked ' + mode);
    this.clicked = mode;
    if (mode === 'public') {
      this.apiReactiveService.getPublicApi().subscribe(
        (data) => {
          this.apiResponse = data;
        },
        (err) => {
          this.apiResponse =
            'Error HTTP Status Code: ' +
            JSON.parse(err.error).status +
            ' | ' +
            'Error Message: ' +
            JSON.parse(err.error).error;
        }
      );
    } else if (mode === 'admin') {
      this.apiReactiveService.getAdminApi().subscribe(
        (data) => {
          this.apiResponse = data;
        },
        (err) => {
          this.apiResponse =
            'Error HTTP Status Code: ' +
            JSON.parse(err.error).status +
            ' | ' +
            'Error Message: ' +
            JSON.parse(err.error).error;
        }
      );
    } else {
      this.apiReactiveService.getModApi().subscribe(
        (data) => {
          this.apiResponse = data;
        },
        (err) => {
          this.apiResponse =
            'Error HTTP Status Code: ' +
            JSON.parse(err.error).status +
            ' | ' +
            'Error Message: ' +
            JSON.parse(err.error).error;
        }
      );
    }
  }
}
