import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialog } from "@angular/material";

import { AppComponent } from '../../app.component';

import { LoaderService } from '../../services/loader.service';
import { MessageService, MessageBoxButton, MessageBoxStyle } from '../../services/message.service';

import { ConfigParameter } from '../../models/config-parameter';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  title = 'Configuration';

  configForm: FormGroup;
  authenticationUrl: FormControl;
  expensesUrl: FormControl;
  operationCondition: FormControl;

  invalidConfig: boolean = false;

  operationConditions = [
    { key: 'Mason Group', value: 0 },
    { key: 'Mason Securities Limited', value: 1 }
  ];

  constructor(@Inject(forwardRef(() => AppComponent)) private appComponent: AppComponent, private router: Router, private loaderService: LoaderService, private messageService: MessageService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.operationCondition = new FormControl(this.operationConditions[environment.operationCondition])

    this.authenticationUrl = new FormControl(environment.authenticationUrl, Validators.required);

    this.expensesUrl = new FormControl(environment.expensesUrl, Validators.required);

    this.configForm = new FormGroup({
      'operationCondition': this.operationCondition,
      'authenticationUrl': this.authenticationUrl,
      'expensesUrl': this.expensesUrl
    });
  }

  config(parameter: ConfigParameter) {
    this.loaderService.showLoader();

    localStorage.setItem('operationCondition', '' + parameter.operationCondition.value);
    localStorage.setItem('authenticationUrl', parameter.authenticationUrl);
    localStorage.setItem('expensesUrl', parameter.expensesUrl);

    this.appComponent.ngOnInit();
    this.messageService.show(this.dialog, 'Configuration is saved.', '', '', MessageBoxButton.None, true, MessageBoxStyle.Simple, "400px");

    this.loaderService.hideLoader();
  }

}
