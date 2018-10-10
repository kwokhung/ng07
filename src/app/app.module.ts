import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ExpenseComponent } from './components/expense/expense.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ExpenseItemComponent } from './components/expense-item/expense-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExpenseComponent,
    ExpenseItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
