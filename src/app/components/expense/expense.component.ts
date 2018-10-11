import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Expense } from '../../models/expense';
import { ExpenseService } from '../../services/expense.service';
import { LoaderService } from '../../services/loader.service';

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

  constructor(private expenseService: ExpenseService, private loaderService: LoaderService) {
    this.loaderService.showLoader();

    this.expenseService.getAllExpenses()
      .subscribe(
        expenses => {
          this.expenses = expenses;
          this.loaderService.hideLoader();
        }
      );
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

  async search(criteria: any) {
    this.loaderService.showLoader();

    await this.delay(1000);

    this.expenseService.getExpenses(criteria)
      .subscribe(
        expenses => {
          this.expenses = expenses;
          this.loaderService.hideLoader();
        }
      );
  }

  clickItem(expense: Expense) {
    //alert(`${expense.id}: ${expense.selected ? 'checked' : 'unchecked'}`);

    this.expenses.forEach(function (item) {
      console.log(`${item.id}: ${item.selected ? 'checked' : 'unchecked'}`);
    });
  }

  async export() {
    this.loaderService.showLoader();
    
    await this.delay(1000);

    let criteria: number[] = [];

    let exported: string = '';

    this.expenses.forEach(function (item) {
      if (item.selected) {
        console.log(`${item.id} exported`);
        exported += `${item.id} exported\r\n`
        criteria.push(item.id);
      }
    });

    this.expenseService.requestToExport(criteria)
      .subscribe(
        result => {
          console.log(`result: ${JSON.stringify(result)}`);
          this.loaderService.hideLoader();
        }
      );

    this.loaderService.hideLoader();
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
