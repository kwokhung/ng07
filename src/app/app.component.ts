import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';

import { ConfigParameter } from './models/config-parameter';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = '';

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    let operationCondition: string = localStorage.getItem('operationCondition');

    if (operationCondition) {
      environment.operationCondition = +operationCondition;
    }

    let authenticationUrl: string = localStorage.getItem('authenticationUrl');

    if (authenticationUrl) {
      environment.authenticationUrl = authenticationUrl;
    }

    let expensesUrl: string = localStorage.getItem('expensesUrl');

    if (expensesUrl) {
      environment.expensesUrl = expensesUrl;
    }

    this.title = (environment.operationCondition == 0 ? 'Mason Group' : 'Mason Securities Limited');
  }

  configChanged(config: ConfigParameter) {
    alert(config);
    this.title = (environment.operationCondition == 0 ? 'Mason Group' : 'Mason Securities Limited');
  }

  isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  login() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login');
  }

}
