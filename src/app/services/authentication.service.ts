import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { LoginParameter } from '../models/login-parameter';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationUrl = environment.expensesUrl;

  constructor(private httpClient: HttpClient) {
  }

  login(parameter: LoginParameter): Observable<any> {
    //console.log(`parameter: ${JSON.stringify(parameter)}`);

    return this.httpClient.post<any>(`${this.authenticationUrl}/login`, {
      operationCondition: environment.operationCondition,
      userId: parameter.userId,
      password: parameter.password
    }).pipe(
      map(data => data.content.token),
      tap(result => {
        console.log('Login...');
        console.log(result);
      }),
      catchError(this.handleError<any>('login', {}))
    );
  }

  isAuthenticated(): boolean {
    let token: any = localStorage.getItem("jwt");

    if (token/* && !this.jwtHelper.isTokenExpired(token)*/) {
      return true;
    }
    else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem("jwt");
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation}: ${error} (raw)`);
      console.error(`${operation}: ${JSON.stringify(error)} (json)`);

      return of(result as T);
    };
  }

}
