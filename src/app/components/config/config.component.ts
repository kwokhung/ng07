import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';
import { LoaderService } from '../../services/loader.service';

import { LoginParameter } from 'src/app/models/login-parameter';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  title = 'Configuration';

  loginForm: FormGroup;
  domain: FormControl;
  userId: FormControl;
  password: FormControl;

  invalidLogin: boolean = false;

  domains = [
    'MASONHK',
    'D4331'
  ];

  constructor(private router: Router, private authenticationService: AuthenticationService, private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.domain = new FormControl(this.domains[environment.operationCondition])

    /*this.domain = new FormControl(null, [
      Validators.required,
      this.regExValidator(/^(MASONHK|D4331)$/i)
    ]);*/

    this.userId = new FormControl(null, Validators.required);

    this.password = new FormControl(null, Validators.required);

    this.loginForm = new FormGroup({
      'domain': this.domain,
      'userId': this.userId,
      'password': this.password
    });
  }

  login(parameter: LoginParameter) {
    this.loaderService.showLoader();

    //await this.loaderService.delay(1000);

    this.authenticationService.login(parameter)
      .subscribe(
        token => {
          if (token) {
            this.router.navigateByUrl('/');
          }
          else {
            this.invalidLogin = true;
          }

          this.loaderService.hideLoader();
        }
      );
  }

  /*private regExValidator(regEx: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return (regEx.test(control.value) ? null : { 'regEx': { value: 'Field is invalid.' } });
    };
  }*/

}
