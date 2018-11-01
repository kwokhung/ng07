import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';

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
    this.userId = new FormControl();
    this.password = new FormControl();

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
            this.router.navigate(["/"]);
          }
          else {
            alert('Login failed.');
            this.invalidLogin = true;
          }

          this.loaderService.hideLoader();
        }
      );
  }

}
