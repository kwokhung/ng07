import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Expense } from '../models/expense';
import { ExportItem } from '../models/export-item';
import { MockData } from '../models/mock-data';
import { SearchCriteria } from '../models/search-criteria';
import { DownloadExportCriteria } from '../models/download-export-criteria';

import { environment } from '../../environments/environment';

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
    /*return this.httpClient.get<Expense[]>(`${this.expensesUrl}/getAllExpenses`)
      .pipe(
        tap(expenses => {
          console.log('Expenses got...');
          console.log(expenses);
        }),
        catchError(this.handleError<Expense[]>('getAllExpenses', MockData.expenses))
      );*/

    return this.httpClient.get<any>(`${this.expensesUrl}/getAllExpenses`)
      .pipe(
        map(data => data.content.expenses.map(expense => {
          return {
            id: expense.RequestId,
            applicationDate: expense.AppDate,
            applicationNo: expense.ApplicationNo,
            payee: expense.PayeeName,
            status: 'Export Pending',
            selected: false
          };
        })),
        tap(expenses => {
          console.log('Expenses got...');
          console.log(expenses);
        }),
        catchError(this.handleError<Expense[]>('getAllExpenses', MockData.expenses))
      );
  }

  getExpenses(parameter: SearchCriteria): Observable<Expense[]> {
    console.log(`parameter: ${JSON.stringify(parameter)}`);

    /*return this.httpClient.post<Expense[]>(`${this.expensesUrl}/getExpenses`, parameter)
      .pipe(
        tap(expenses => {
          console.log('Expenses got...');
          console.log(expenses);
        }),
        catchError(this.handleError<Expense[]>('getExpenses', []))
      );*/

    return this.httpClient.post<any>(`${this.expensesUrl}/getExpenses`, parameter)
      .pipe(
        map(data => data.content.expenses.map(expense => {
          return {
            id: expense.RequestId,
            applicationDate: expense.AppDate,
            applicationNo: expense.ApplicationNo,
            payee: expense.PayeeName,
            status: 'Export Pending',
            selected: false
          };
        })),
        tap(expenses => {
          console.log('Expenses got...');
          console.log(expenses);
        }),
        catchError(this.handleError<Expense[]>('getExpenses', []))
      );
  }

  requestToExport(parameter: number[]): Observable<any> {
    console.log(`parameter: ${JSON.stringify(parameter)}`);

    /*return this.httpClient.post<any>(`${this.expensesUrl}/requestToExport`, parameter)
      .pipe(
        tap(result => {
          console.log('Export requested...');
          console.log(result);
        }),
        catchError(this.handleError<any>('requestToExport', {}))
      );*/

    return this.httpClient.post<any>(`${this.expensesUrl}/requestToExport`, { ids: parameter })
      .pipe(
        tap(result => {
          console.log('Export requested...');
          console.log(result);
        }),
        catchError(this.handleError<any>('requestToExport', {}))
      );
  }

  getExportList(): Observable<ExportItem[]> {
    /*return this.httpClient.get<ExportItem[]>(`${this.expensesUrl}/getExportList`)
      .pipe(
        tap(result => {
          console.log('Export List got...');
          console.log(result);
        }),
        catchError(this.handleError<ExportItem[]>('getExportList', []))
      );*/

    return this.httpClient.get<any>(`${this.expensesUrl}/getExportList`)
      .pipe(
        map(data => data.content.exportList),
        tap(result => {
          console.log('Export List got...');
          console.log(result);
        }),
        catchError(this.handleError<ExportItem[]>('getExportList', []))
      );
  }

  getExportItemFile(parameter: DownloadExportCriteria): Observable<Blob> {
    console.log(`parameter: ${JSON.stringify(parameter)}`);

    /*return this.httpClient.post(`${this.expensesUrl}/getExportItemFile`, parameter, { responseType: 'blob' })
      .pipe(
        tap(result => {
          console.log('Export Item File got...');
          console.log(result);
        }),
        catchError(this.handleError('getExportItemFile', new Blob(['"SeqNo","ExpenseId","ApplicationNo"\r\n'], { type: 'application/octet-stream' })))
      );*/

    return this.httpClient.post(`${this.expensesUrl}/getExportItemFile`, parameter, { responseType: 'blob' })
      .pipe(
        tap(result => {
          console.log('Export Item File got...');
          console.log(result);
        }),
        catchError(this.handleError('getExportItemFile', new Blob(['"SeqNo","ExpenseId","ApplicationNo"\r\n'], { type: 'application/octet-stream' })))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation}: ${JSON.stringify(error)}`);

      return of(result as T);
    };
  }

}
