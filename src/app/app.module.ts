import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";

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
import { ConfigComponent } from './components/config/config.component';
import { SimpleDialogComponent } from './components/simple-dialog/simple-dialog.component';

import { ExpenseService } from './services/expense.service';
import { LoaderService } from './services/loader.service';
import { AuthenticationService } from './services/authentication.service';
import { MessageService } from './services/message.service';

import { FormatDatePipe } from './pipes/format-date.pipe';

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
    ConfigComponent,
    SimpleDialogComponent,
    FormatDatePipe
  ],
  entryComponents: [
    SimpleDialogComponent
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
    MatCardModule,
    MatToolbarModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [
    ExpenseService,
    LoaderService,
    AuthenticationService,
    MessageService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'YYYY/MM/DD',
        },
        display: {
          dateInput: 'YYYY/MM/DD',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'YYYY/MM/DD',
          monthYearA11yLabel: 'MMMM YYYY',
        }
      }
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
