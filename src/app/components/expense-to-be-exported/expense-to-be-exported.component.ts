import { Component, OnInit } from '@angular/core';

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

  constructor(private expenseService: ExpenseService, private loaderService: LoaderService) {
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

}
