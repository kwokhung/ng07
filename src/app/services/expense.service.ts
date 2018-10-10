import { Injectable } from '@angular/core';
import { Expense } from '../models/expense';
import { MockData } from '../models/mock-data';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  expenses: Expense[] = [];

  constructor() {
    this.expenses = MockData.Expenses;
  }

  getExpenses(): Expense[] {
    return this.expenses;
  }

}
