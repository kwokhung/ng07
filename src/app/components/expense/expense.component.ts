import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Expense } from '../../models/expense';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  title = 'Expense Voucher Export';

  searchForm: FormGroup;
  applicationDate: FormControl;
  applicationNo: FormControl;
  payee: FormControl;

  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) {
    //this.expenses = expenseService.getExpenses({});
  }

  ngOnInit() {
    this.applicationDate = new FormControl();
    this.applicationNo = new FormControl();
    this.payee = new FormControl();

    this.searchForm = new FormGroup({
      'applicationDate': this.applicationDate,
      'applicationNo': this.applicationNo,
      'payee': this.payee
    });
  }

  search(criteria: any) {
    this.expenseService.getExpenses(criteria)
      .subscribe(
        expenses => {
          this.expenses = expenses;
          //this.loaderService.hideLoader();
        }
      );
  }

  clickItem(expense: Expense) {
    //alert(`${expense.id}: ${expense.selected ? 'checked' : 'unchecked'}`);

    this.expenses.forEach(function (item) {
      console.log(`${item.id}: ${item.selected ? 'checked' : 'unchecked'}`);
    });
  }

  export() {
    //alert("exporting...");

    let exported: string = '';

    this.expenses.forEach(function (item) {
      if (item.selected) {
        console.log(`${item.id} exported`);
        exported += `${item.id} exported\r\n`
      }
    });

    alert(exported);
  }

}
