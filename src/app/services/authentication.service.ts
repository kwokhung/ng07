import { Injectable } from '@angular/core';
import { Observable, of, forkJoin, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginParameter } from '../models/login-parameter';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationUrl = environment.authenticationUrl;

  constructor(private httpClient: HttpClient) {
  }

  login(parameter: LoginParameter): Observable<any> {
    //console.log(`parameter: ${JSON.stringify(parameter)}`);
    //let token: any = {};
    //localStorage.setItem('jwt', token);
    //return of(token);

    return this.httpClient.post<any>(`${this.authenticationUrl}/User/Login`, {
      txtDomain: parameter.domain,
      txtSamAccountName: parameter.userId,
      txtPassword: parameter.password
    }, {
        headers: new HttpHeaders({
          'X-Requested-With': 'XMLHttpRequest'
        })
      }
    ).pipe(
      tap(data => {
        console.log('Login...');
        console.log(data);

        if (data.status !== 'true') {
          throw new Error(data.errMsg);
        }
        else if (data.content.token) {
          localStorage.setItem('jwt', data.content.token);
        }
        else {
          throw new Error('Token is missing.');
        }
      }),
      catchError(this.handleError<any>('login', null))
    );
  }

  refreshToken(data: any) {
    if (data.content.refreshtoken) {
      localStorage.setItem('jwt', data.content.refreshtoken);
    }
  }

  isAuthenticated(): boolean {
    let token: any = localStorage.getItem('jwt');

    //console.log(`Token: ${token}`);

    if (token) {
      return true;
    }
    else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  addBearer(headers: HttpHeaders): HttpHeaders {
    let token: any = localStorage.getItem('jwt');

    //console.log(`Token: ${token}`);

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation}: ${error} (raw)`);
      console.error(`${operation}: ${JSON.stringify(error)} (json)`);

      return of(result as T);
    };
  }

}
