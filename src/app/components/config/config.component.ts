import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { LoaderService } from '../../services/loader.service';

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

  constructor(private router: Router, private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.operationCondition = new FormControl(this.operationConditions[environment.operationCondition])

    this.authenticationUrl = new FormControl(null, Validators.required);

    this.expensesUrl = new FormControl(null, Validators.required);

    this.configForm = new FormGroup({
      'operationCondition': this.operationCondition,
      'authenticationUrl': this.authenticationUrl,
      'expensesUrl': this.expensesUrl
    });
  }

  config() {
    this.loaderService.showLoader();

    //await this.loaderService.delay(1000);

    this.loaderService.hideLoader();
  }

}
