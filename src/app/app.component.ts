import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material";

import { MessageService, MessageBoxButton, MessageBoxStyle } from './services/message.service';
import { AuthenticationService } from './services/authentication.service';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = '';
  subscriber: Subscription;

  constructor(private router: Router, private authenticationService: AuthenticationService, private messageService: MessageService, private dialog: MatDialog) {
    this.subscriber = this.messageService.getMessage().subscribe(message => {
      this.messageService.show(this.dialog, message.text, '', '', MessageBoxButton.None, true, message.type, "400px");
    });
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
