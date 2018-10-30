import { Component, ElementRef, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { ExpenseItemComponent } from '../expense-item/expense-item.component';

import { Expense } from '../../models/expense';
import { SearchExpenseCriteria } from '../../models/search-expense-criteria';

import { ExpenseService } from '../../services/expense.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  @ViewChild('checkAll') checkAll: ElementRef;
  @ViewChildren(ExpenseItemComponent) exportItems: QueryList<ExpenseItemComponent>;

  title = 'Expense Voucher Export';

  searchForm: FormGroup;
  applicationDate: FormControl;
  applicationNo: FormControl;
  payee: FormControl;

  expenses: Expense[] = [];

  nativeElement: any;

  constructor(private element: ElementRef, private router: Router, private expenseService: ExpenseService, private loaderService: LoaderService) {
    this.nativeElement = element.nativeElement;
  }

  async ngOnInit() {
    this.applicationDate = new FormControl();
    this.applicationNo = new FormControl();
    this.payee = new FormControl();

    this.searchForm = new FormGroup({
      'applicationDate': this.applicationDate,
      'applicationNo': this.applicationNo,
      'payee': this.payee
    });

    /*this.loaderService.showLoader();

    //await this.loaderService.delay(1000);

    this.expenseService.getAllExpenses()
      .subscribe(
        expenses => {
          this.expenses = expenses;
          this.loaderService.hideLoader();
        }
      );*/
  }

  clickAll(e) {
    //alert(`${e.target.checked ? 'checked' : 'unchecked'}`);

    this.exportItems.forEach(exportItem => {
      //console.log(exportItem);
      exportItem.setChecked(e.target.checked);
    });
  }

  async search(parameter: SearchExpenseCriteria) {
    this.loaderService.showLoader();

    //await this.loaderService.delay(1000);

    this.expenseService.getExpenses(parameter)
      .subscribe(
        expenses => {
          this.expenses = expenses;

          this.expenses.forEach(item => {
            if (this.expenseService.isExpenseInCart(item.id)) {
              item.selected = true;
            }
          });

          this.loaderService.hideLoader();
        }
      );
  }

  itemClicked(expense: Expense) {
    //alert(`${expense.id}: ${expense.selected ? 'checked' : 'unchecked'}`);

    if (expense.selected) {
      this.expenseService.addExpenseToCart(expense.id);
    }
    else {
      this.expenseService.removeExpenseFromCart(expense.id);
    }

    //this.expenses.forEach(item => {
    //console.log(`${item.id}: ${item.selected ? 'checked' : 'unchecked'}`);
    //});

    if (this.expenses.every(item => item.selected)) {
      //console.log('all checked');
      //this.nativeElement.querySelector('input[type=checkbox]').checked = true;
      this.checkAll.nativeElement.checked = true;
    }

    if (this.expenses.every(item => !item.selected)) {
      //console.log('all unchecked');
      //this.nativeElement.querySelector('input[type=checkbox]').checked = false;
      this.checkAll.nativeElement.checked = false;
    }
  }

}
