import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Expense } from '../models/expense';
import { ExportItem } from '../models/export-item';
import { MockData } from '../models/mock-data';
import { environment } from '../../environments/environment';

interface Criteria {
  applicationDate: string;
  applicationNo: string;
  payee: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  expensesUrl = environment.expensesUrl;
  expenses: Expense[] = [];

  constructor(private httpClient: HttpClient) {
    this.expenses = MockData.expenses;
  }

  getAllExpenses(): Observable<Expense[]> {
    return this.httpClient.get<Expense[]>(`${this.expensesUrl}/getAllExpenses`)
      .pipe(
        tap(expenses => {
          console.log('Expenses got...');
          console.log(expenses);
        }),
        catchError(this.handleError<Expense[]>('getAllExpenses', MockData.expenses))
      );
  }

  getExpenses(parameter: Criteria): Observable<Expense[]> {
    console.log(`parameter: ${JSON.stringify(parameter)}`);

    return this.httpClient.post<Expense[]>(`${this.expensesUrl}/getExpenses`, parameter)
      .pipe(
        tap(expenses => {
          console.log('Expenses got...');
          console.log(expenses);
        }),
        catchError(this.handleError<Expense[]>('getExpenses', []))
      );
  }

  requestToExport(parameter: number[]): Observable<any> {
    console.log(`parameter: ${JSON.stringify(parameter)}`);

    return this.httpClient.post<any>(`${this.expensesUrl}/requestToExport`, parameter)
      .pipe(
        tap(result => {
          console.log('Export requested...');
          console.log(result);
        }),
        catchError(this.handleError<any>('requestToExport', {}))
      );
  }

  getExportList(): Observable<ExportItem[]> {
    return this.httpClient.get<ExportItem[]>(`${this.expensesUrl}/getExportList`)
      .pipe(
        tap(result => {
          console.log('Export List got...');
          console.log(result);
        }),
        catchError(this.handleError<ExportItem[]>('getExportList', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation}: ${JSON.stringify(error)}`);

      return of(result as T);
    };
  }

}
