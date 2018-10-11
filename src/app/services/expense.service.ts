import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Expense } from '../models/expense';
import { MockData } from '../models/mock-data';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  expensesUrl = 'http://localhost:3000/expense';
  expenses: Expense[] = [];

  constructor(private httpClient: HttpClient) {
    this.expenses = MockData.expenses;
  }

  getAllExpenses(): Observable<Expense[]> {
    return this.httpClient.get<Expense[]>(`${this.expensesUrl}/getAllExpenses`)
      .pipe(
        tap(expenses => {
          console.log('Expenses fetched...');
          console.log(expenses);
        }),
        catchError(this.handleError<Expense[]>('getAllExpenses', MockData.expenses))
      );
  }

  getExpenses(criteria: any): Observable<Expense[]> {
    console.log(`criteria: ${JSON.stringify(criteria)}`);

    return this.httpClient.post<Expense[]>(`${this.expensesUrl}/getExpenses`, criteria)
      .pipe(
        tap(expenses => {
          console.log('Expenses fetched...');
          console.log(expenses);
        }),
        catchError(this.handleError<Expense[]>('getExpenses', MockData.expenses))
      );
  }

  requestToExport(criteria: any): Observable<Expense[]> {
    console.log(`criteria: ${JSON.stringify(criteria)}`);

    return this.httpClient.post<any>(`${this.expensesUrl}/requestToExport`, criteria)
      .pipe(
        tap(result => {
          console.log('Export requested...');
          console.log(result);
        }),
        catchError(this.handleError<any>('requestToExport', {}))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation}: ${JSON.stringify(error)}`);

      return of(result as T);
    };
  }

}
