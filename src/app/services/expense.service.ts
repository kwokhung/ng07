import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Expense } from '../models/expense';
import { ExportItem } from '../models/export-item';
import { DuplicateInvoice } from '../models/duplicate-invoice';
import { MockData } from '../models/mock-data';
import { SearchExpenseCriteria } from '../models/search-expense-criteria';
import { SearchExportCriteria } from '../models/search-export-criteria';
import { DownloadExportCriteria } from '../models/download-export-criteria';

import { AuthenticationService } from '../services/authentication.service';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  expensesUrl = environment.expensesUrl;
  expenses: Expense[] = [];
  expenseCart: number[] = [];

  constructor(private router: Router, private httpClient: HttpClient, private authenticationService: AuthenticationService) {
    this.expenses = MockData.expenses;
  }

  getAllExpenses(): Observable<Expense[]> {
    return this.httpClient.post<any>(`${this.expensesUrl}/getAllExpenses`, {
      operationCondition: environment.operationCondition
    }, {
        headers: this.authenticationService.addBearer(new HttpHeaders({
          'X-Requested-With': 'XMLHttpRequest'
        }))
      }
    ).pipe(
      tap(data => {
        this.authenticationService.refreshToken(data);
      }),
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

  getExpenses(parameter: SearchExpenseCriteria): Observable<Expense[]> {
    //console.log(`parameter: ${JSON.stringify(parameter)}`);

    return this.httpClient.post<any>(`${this.expensesUrl}/getExpenses`, {
      operationCondition: environment.operationCondition,
      applicationDate: (parameter.applicationDate ? parameter.applicationDate.format('YYYYMMDD') : null),
      applicationNo: parameter.applicationNo,
      payee: parameter.payee
    }, {
        headers: this.authenticationService.addBearer(new HttpHeaders({
          'X-Requested-With': 'XMLHttpRequest'
        }))
      }
    ).pipe(
      tap(data => {
        this.authenticationService.refreshToken(data);
      }),
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
    //console.log(`parameter: ${JSON.stringify(parameter)}`);

    return this.httpClient.post<any>(`${this.expensesUrl}/requestToExport`, {
      operationCondition: environment.operationCondition,
      ids: parameter
    }, {
        headers: this.authenticationService.addBearer(new HttpHeaders({
          'X-Requested-With': 'XMLHttpRequest'
        }))
      }
    ).pipe(
      tap(data => {
        this.authenticationService.refreshToken(data);
      }),
      tap(result => {
        console.log('Export requested...');
        console.log(result);
      }),
      catchError(this.handleError<any>('requestToExport', {}))
    );
  }

  getWholeExportList(): Observable<ExportItem[]> {
    return this.httpClient.post<any>(`${this.expensesUrl}/getWholeExportList`, {
      operationCondition: environment.operationCondition
    }, {
        headers: this.authenticationService.addBearer(new HttpHeaders({
          'X-Requested-With': 'XMLHttpRequest'
        }))
      }
    ).pipe(
      tap(data => {
        this.authenticationService.refreshToken(data);
      }),
      map(data => data.content.exportList),
      tap(exportItems => {
        console.log('Export List got...');
        console.log(exportItems);
      }),
      catchError(this.handleError<ExportItem[]>('getWholeExportList', []))
    );
  }

  getExportList(parameter: SearchExportCriteria): Observable<ExportItem[]> {
    //console.log(`parameter: ${JSON.stringify(parameter)}`);

    return this.httpClient.post<any>(`${this.expensesUrl}/getExportList`, {
      operationCondition: environment.operationCondition,
      date: (parameter.date ? parameter.date.format('YYYYMMDD') : null)
    }, {
        headers: this.authenticationService.addBearer(new HttpHeaders({
          'X-Requested-With': 'XMLHttpRequest'
        }))
      }
    ).pipe(
      tap(data => {
        this.authenticationService.refreshToken(data);
      }),
      map(data => data.content.exportList),
      tap(exportItems => {
        console.log('Export List got...');
        console.log(exportItems);
      }),
      catchError(this.handleError<ExportItem[]>('getExportList', []))
    );
  }

  getExportItemFile(parameter: DownloadExportCriteria): Observable<Blob> {
    //console.log(`parameter: ${JSON.stringify(parameter)}`);

    return this.httpClient.post(`${this.expensesUrl}/getExportItemFile`, {
      operationCondition: environment.operationCondition,
      date: parameter.date,
      batchNo: parameter.batchNo
    }, {
        headers: this.authenticationService.addBearer(new HttpHeaders({
          'X-Requested-With': 'XMLHttpRequest'
        })),
        responseType: 'blob'
      }
    ).pipe(
      tap(file => {
        console.log('Export Item File got...');
        console.log(file);
      }),
      catchError(this.handleError('getExportItemFile', new Blob(['"Failed to get Export Item File"\r\n'], { type: 'application/octet-stream' })))
    );
  }

  getAllDuplicateInvoices(): Observable<DuplicateInvoice[]> {
    return this.httpClient.post<any>(`${this.expensesUrl}/getAllDuplicateInvoices`, {
      operationCondition: environment.operationCondition
    }, {
        headers: this.authenticationService.addBearer(new HttpHeaders({
          'X-Requested-With': 'XMLHttpRequest'
        }))
      }
    ).pipe(
      tap(data => {
        this.authenticationService.refreshToken(data);
      }),
      map(data => data.content.duplicateInvoices.map((duplicateInvoice, index) => {
        return {
          id: duplicateInvoice.Id,
          documentNo: duplicateInvoice.DocumentNo,
          documentDate: duplicateInvoice.DocumentDate,
          payee: duplicateInvoice.Payee,
          applicationNos: duplicateInvoice.ApplicationNos
        };
      })),
      tap(duplicateInvoices => {
        console.log('Duplicate Invoices got...');
        console.log(duplicateInvoices);
      }),
      catchError(this.handleError<DuplicateInvoice[]>('getAllDuplicateInvoices', []))
    );
  }

  expensesInCart(): number[] {
    return this.expenseCart;
  }

  isExpenseInCart(id: number): boolean {
    return this.expenseCart.includes(id);
  }

  addExpenseToCart(id: number) {
    //console.log(id);

    if (!this.expenseCart.includes(id)) {
      this.expenseCart.push(id);
    }

    //console.log(this.expenseCart);
  }

  removeExpenseFromCart(id: number) {
    //console.log(id);

    if (this.expenseCart.includes(id)) {
      this.expenseCart = this.expenseCart.filter(item => item !== id);
    }

    //console.log(this.expenseCart);
  }

  clearExpenseCart() {
    this.expenseCart = [];
  }

  getExpensesFromCart(): Observable<Expense[]> {
    let expenses: Observable<Expense>[] = [];

    this.expenseCart.forEach(item => {
      expenses.push(this.httpClient.post<any>(`${this.expensesUrl}/getExpenseByRequestId`, {
        operationCondition: environment.operationCondition,
        id: item
      }, {
          headers: this.authenticationService.addBearer(new HttpHeaders({
            'X-Requested-With': 'XMLHttpRequest'
          }))
        }
      ).pipe(
        tap(data => {
          this.authenticationService.refreshToken(data);
        }),
        map(data => {
          return {
            id: data.content.expense.RequestId,
            applicationDate: data.content.expense.AppDate,
            applicationNo: data.content.expense.ApplicationNo,
            payee: data.content.expense.PayeeName,
            status: data.content.expenseStatus,
            selected: true
          };
        }),
        tap(expense => {
          console.log('Expense got...');
          console.log(expense);
        }),
        catchError(this.handleError<Expense>('getExpenseByRequestId', null))
      ));
    });

    if (expenses.length > 0) {
      return forkJoin(expenses);
    }
    else {
      return of([]);
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation}: ${error} (raw)`);
      console.error(`${operation}: ${JSON.stringify(error)} (json)`);

      if (error.status && error.status === 401) {
        if (error.error && error.error.errMsg) {
          alert(JSON.stringify(error.error.errMsg));
        }

        this.authenticationService.logout();
        this.router.navigateByUrl('/login');
      }

      return of(result as T);
    };
  }

}
