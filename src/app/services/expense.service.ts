import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Expense } from '../models/expense';
import { ExportItem } from '../models/export-item';
import { MockData } from '../models/mock-data';
import { SearchCriteria } from '../models/search-criteria';
import { SearchExportCriteria } from '../models/search-export-criteria';
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
        map(data => data.content.expenses.map((expense, index) => {
          return {
            id: expense.RequestId,
            applicationDate: expense.AppDate,
            applicationNo: expense.ApplicationNo,
            payee: expense.PayeeName,
            status: data.content.expensesStatus[index],
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
        map(data => data.content.expenses.map((expense, index) => {
          return {
            id: expense.RequestId,
            applicationDate: expense.AppDate,
            applicationNo: expense.ApplicationNo,
            payee: expense.PayeeName,
            status: data.content.expensesStatus[index],
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

  getWholeExportList(): Observable<ExportItem[]> {
    /*return this.httpClient.get<ExportItem[]>(`${this.expensesUrl}/getWholeExportList`)
      .pipe(
        tap(result => {
          console.log('Export List got...');
          console.log(result);
        }),
        catchError(this.handleError<ExportItem[]>('getWholeExportList', []))
      );*/

    return this.httpClient.get<any>(`${this.expensesUrl}/getWholeExportList`)
      .pipe(
        map(data => data.content.exportList),
        tap(result => {
          console.log('Export List got...');
          console.log(result);
        }),
        catchError(this.handleError<ExportItem[]>('getWholeExportList', []))
      );
  }

  getExportList(parameter: SearchExportCriteria): Observable<ExportItem[]> {
    /*return this.httpClient.post<ExportItem[]>(`${this.expensesUrl}/getExportList`, parameter)
      .pipe(
        tap(result => {
          console.log('Export List got...');
          console.log(result);
        }),
        catchError(this.handleError<ExportItem[]>('getExportList', []))
      );*/

    return this.httpClient.post<any>(`${this.expensesUrl}/getExportList`, parameter)
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
