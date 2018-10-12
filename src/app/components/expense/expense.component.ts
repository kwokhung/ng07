import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Expense } from '../../models/expense';
import { ExpenseService } from '../../services/expense.service';
import { LoaderService } from '../../services/loader.service';

interface Criteria {
  applicationDate: string;
  applicationNo: string;
  payee: string;
}

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

  constructor(private router: Router, private expenseService: ExpenseService, private loaderService: LoaderService) {
    /*this.loaderService.showLoader();

    await this.delay(1000);

    this.expenseService.getAllExpenses()
      .subscribe(
        expenses => {
          this.expenses = expenses;
          this.loaderService.hideLoader();
        }
      );*/
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

  async search(parameter: Criteria) {
    this.loaderService.showLoader();

    await this.delay(1000);

    this.expenseService.getExpenses(parameter)
      .subscribe(
        expenses => {
          this.expenses = expenses;
          this.loaderService.hideLoader();
        }
      );
  }

  clickItem(expense: Expense) {
    //alert(`${expense.id}: ${expense.selected ? 'checked' : 'unchecked'}`);

    this.expenses.forEach(item => {
      console.log(`${item.id}: ${item.selected ? 'checked' : 'unchecked'}`);
    });
  }

  async export() {
    this.loaderService.showLoader();

    await this.delay(1000);

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
          /*this.expenseService.getExpenses(this.searchForm.value)
            .subscribe(
              expenses => {
                this.expenses = expenses;
                this.loaderService.hideLoader();
              }
            );*/
          this.loaderService.hideLoader();
          this.router.navigateByUrl('/export-list');
        }
      );
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
