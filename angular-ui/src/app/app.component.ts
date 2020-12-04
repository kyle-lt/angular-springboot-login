import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { UserService } from './_services/user.service';
import { AuthService } from './_services/auth.service';

// OpenTelemetry - Instantiate Tracer
/*
import { LogLevel } from '@opentelemetry/core';
import { NodeTracerProvider } from '@opentelemetry/node';
import { SimpleSpanProcessor } from '@opentelemetry/tracing';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
const provider: NodeTracerProvider = new NodeTracerProvider({
  logLevel: LogLevel.ERROR,
});
*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private roles: string[] = [] as string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string = "";
  //modes: Array<String> = ['public', 'admin', 'mod']

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    // OpenTelemetry Intialization - not working!
    /*
    provider.register();
    provider.addSpanProcessor(
      new SimpleSpanProcessor(
        new JaegerExporter({
          serviceName: 'angular-ui',
          // TODO - change this to host.docker.internal
          //host: 'localhost', // optional
          //port: 6832, // optional
          // If you are running your tracing backend on another host,
          // you can point to it using the `url` parameter of the
          // exporter config.
        })
      )
    );
    */
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  getTestPublicContent(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log('Error HTTP Status Code: ' + JSON.parse(err.error).status + ' | ' + 'Error Message: ' + JSON.parse(err.error).error);
      }
    );
  }

  getAuthPublicContent(): void {
    this.authService.getPublicContent().subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log('Error HTTP Status Code: ' + JSON.parse(err.error).status + ' | ' + 'Error Message: ' + JSON.parse(err.error).error);
      }
    );
  }
}
