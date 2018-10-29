import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Expense } from '../../models/expense';

import { ExpenseService } from '../../services/expense.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-expense-to-be-exported',
  templateUrl: './expense-to-be-exported.component.html',
  styleUrls: ['./expense-to-be-exported.component.css']
})
export class ExpenseToBeExportedComponent implements OnInit {

  title = 'Expenses To Be Exported';

  expenses: Expense[] = [];

  constructor(private router: Router, private expenseService: ExpenseService, private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.loaderService.showLoader();

    //await this.loaderService.delay(1000);

    this.expenseService.getExpensesFromCart()
      .subscribe(
        expenses => {
          console.log(expenses);
          this.expenses = expenses;
          this.loaderService.hideLoader();
        }
      );
  }

  clickItem(expense: Expense) {
    //alert(`${expense.id}: ${expense.selected ? 'checked' : 'unchecked'}`);

    if (expense.selected) {
      this.expenseService.addExpenseToCart(expense.id);
    }
    else {
      this.expenseService.removeExpenseFromCart(expense.id);
    }

    this.expenses.forEach(item => {
      console.log(`${item.id}: ${item.selected ? 'checked' : 'unchecked'}`);
    });
  }

  async export() {
    this.loaderService.showLoader();

    //await this.loaderService.delay(1000);

    let parameter: number[] = [];

    this.expenses.forEach(item => {
      if (item.selected) {
        console.log(`${item.id} exported`);
        parameter.push(item.id);
      }
    });

    this.expenseService.requestToExport(parameter)
      .subscribe(
        result => {
          console.log(`result: ${JSON.stringify(result)}`);
          this.loaderService.hideLoader();
          this.expenseService.clearExpenseCart();
          this.router.navigateByUrl('/export-list');
        }
      );
  }

  cancel() {
    this.expenseService.clearExpenseCart();
    this.router.navigateByUrl('/');
  }

}
