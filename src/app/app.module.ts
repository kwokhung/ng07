import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { ExpenseItemComponent } from './components/expense-item/expense-item.component';
import { ExportListComponent } from './components/export-list/export-list.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ExportItemComponent } from './components/export-item/export-item.component';
import { DuplicateInvoiceComponent } from './components/duplicate-invoice/duplicate-invoice.component';
import { DuplicateInvoiceItemComponent } from './components/duplicate-invoice-item/duplicate-invoice-item.component';
import { ExpenseToBeExportedComponent } from './components/expense-to-be-exported/expense-to-be-exported.component';
import { LoginComponent } from './components/login/login.component';

import { ExpenseService } from './services/expense.service';
import { LoaderService } from './services/loader.service';
import { AuthenticationService } from './services/authentication.service';

import { FormatDatePipe } from './pipes/format-date.pipe';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'YYYY/MM/DD',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExpenseComponent,
    ExpenseItemComponent,
    ExportListComponent,
    ExportItemComponent,
    LoaderComponent,
    DuplicateInvoiceComponent,
    DuplicateInvoiceItemComponent,
    ExpenseToBeExportedComponent,
    LoginComponent,
    FormatDatePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule
  ],
  providers: [
    ExpenseService,
    LoaderService,
    AuthenticationService,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
