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

  expensesUrl = 'http://localhost:3000/expense/getExpenses';
  expenses: Expense[] = [];

  constructor(private httpClient: HttpClient) {
    this.expenses = MockData.Expenses;
  }

  /*getExpenses(criteria: any): Expense[] {
    return this.expenses;
  }*/

  getExpenses(criteria: any): Observable<Expense[]> {
    console.log(`criteria: ${JSON.stringify(criteria)}`);

    return this.httpClient.get<Expense[]>(this.expensesUrl)
      .pipe(
        tap(expenses => {
          console.log('Expenses fetched...');
          console.log(expenses);
        }),
        catchError(this.handleError<Expense[]>('getExpenses', MockData.Expenses))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation}: ${JSON.stringify(error)}`);

      return of(result as T);
    };
  }

}
