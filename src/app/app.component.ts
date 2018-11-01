import { Component } from '@angular/core';

import { AuthenticationService } from './services/authentication.service';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = (environment.operationCondition == 0 ? 'Mason Group' : 'Mason Securities Limited');

  constructor(private authenticationService: AuthenticationService) {
  }

  isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  logout() {
    this.authenticationService.logout();
  }

}
