import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { ExpenseItemComponent } from './components/expense-item/expense-item.component';
import { LoaderComponent } from './components/loader/loader.component';

import { ExpenseService } from './services/expense.service';
import { LoaderService } from './services/loader.service';

library.add(faSpinner);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExpenseComponent,
    ExpenseItemComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [ExpenseService, LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
