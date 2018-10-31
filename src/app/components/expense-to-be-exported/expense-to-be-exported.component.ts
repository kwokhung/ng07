import { Component, ElementRef, OnInit, AfterViewChecked, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';

import { ExpenseItemComponent } from '../expense-item/expense-item.component';

import { Expense } from '../../models/expense';

import { ExpenseService } from '../../services/expense.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-expense-to-be-exported',
  templateUrl: './expense-to-be-exported.component.html',
  styleUrls: ['./expense-to-be-exported.component.css']
})
export class ExpenseToBeExportedComponent implements OnInit, AfterViewChecked {

  @ViewChild('checkAll') checkAll: ElementRef;
  @ViewChildren(ExpenseItemComponent) exportItems: QueryList<ExpenseItemComponent>;

  title = 'Expenses To Be Exported';

  expenses: Expense[] = [];
  firstTime: boolean = true;

  nativeElement: any;

  constructor(private element: ElementRef, private router: Router, private expenseService: ExpenseService, private loaderService: LoaderService) {
    this.nativeElement = element.nativeElement;
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

  ngAfterViewChecked() {
    if (this.checkAll !== undefined && this.firstTime) {
      if (this.expenses.every(item => item.selected)) {
        this.checkAll.nativeElement.checked = true;
      }

      if (this.expenses.every(item => !item.selected)) {
        this.checkAll.nativeElement.checked = false;
      }

      this.firstTime = false;
    }
  }

  clickAll(e) {
    //alert(`${e.target.checked ? 'checked' : 'unchecked'}`);

    this.exportItems.forEach(exportItem => {
      //console.log(exportItem);
      exportItem.setChecked(e.target.checked);
    });
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

  async export() {
    this.loaderService.showLoader();

    //await this.loaderService.delay(1000);

    let parameter: number[] = [];

    this.expenses.forEach(item => {
      if (item.selected) {
        //console.log(`${item.id} exported`);
        parameter.push(item.id);
      }
    });

    this.expenseService.requestToExport(parameter)
      .subscribe(
        result => {
          //console.log(`result: ${JSON.stringify(result)}`);
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
