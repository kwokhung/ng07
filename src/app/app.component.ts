import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthenticationService } from './services/authentication.service';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = (environment.operationCondition == 0 ? 'Mason Group' : 'Mason Securities Limited');

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    let authenticationUrl: string = localStorage.getItem("authenticationUrl");

    if (authenticationUrl) {
      environment.authenticationUrl = authenticationUrl;
    }

    let expensesUrl: string = localStorage.getItem("expensesUrl");

    if (expensesUrl) {
      environment.expensesUrl = expensesUrl;
    }

    let operationCondition: string = localStorage.getItem("operationCondition");

    if (operationCondition) {
      environment.operationCondition = +operationCondition;
    }
  }

  isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login');
  }

}
