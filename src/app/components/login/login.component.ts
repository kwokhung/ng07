import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';
import { LoaderService } from '../../services/loader.service';

import { LoginParameter } from 'src/app/models/login-parameter';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean;
  title = 'Login';

  loginForm: FormGroup;
  userId: FormControl;
  password: FormControl;

  constructor(private router: Router, private authenticationService: AuthenticationService, private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.userId = new FormControl(null, [
      Validators.required,
      this.regExValidator(/^admin$/i)
    ]);
    this.password = new FormControl(null, Validators.required);

    this.loginForm = new FormGroup({
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
            localStorage.setItem("jwt", token);

            this.invalidLogin = false;
            this.router.navigateByUrl('/');
          }
          else {
            alert('Login failed.');
            this.invalidLogin = true;
          }

          this.loaderService.hideLoader();
        }
      );
  }

  private regExValidator(regEx: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return (regEx.test(control.value) ? null : { 'regEx': { value: 'Field is invalid.' } });
    };
  }

}
