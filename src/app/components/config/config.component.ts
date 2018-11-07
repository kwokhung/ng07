import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { LoaderService } from '../../services/loader.service';

import { ConfigParameter } from '../../models/config-parameter';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  @Output() configChanged = new EventEmitter<ConfigParameter>();

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

  constructor(private router: Router, private loaderService: LoaderService) {
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

    this.configChanged.emit(parameter);

    this.loaderService.hideLoader();
  }

}
