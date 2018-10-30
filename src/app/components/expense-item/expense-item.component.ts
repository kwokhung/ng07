import { Component, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Expense } from '../../models/expense';

import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.css']
})
export class ExpenseItemComponent implements OnInit {

  @Input() expense: Expense;
  @Output() clicked = new EventEmitter<Expense>();

  nativeElement: any;

  constructor(private element: ElementRef, private expenseService: ExpenseService) {
    this.nativeElement = element.nativeElement;
  }

  ngOnInit() {
    if (this.expense.selected) {
      //console.log(this.nativeElement);
      //console.log(this.nativeElement.querySelector('input[type=checkbox]'));
      this.nativeElement.querySelector('input[type=checkbox]').checked = true;
    }

    if (this.expense.status === 'Exported') {
      //console.log(this.nativeElement);
      //console.log(this.nativeElement.querySelector('.card'));
      this.nativeElement.querySelector('.card').classList.remove('bg-primary');
      this.nativeElement.querySelector('.card').classList.add('bg-danger');
    }
  }

  click(e) {
    //alert(`${this.expense.id}: ${e.target.checked ? 'checked' : 'unchecked'}`);

    this.expense.selected = e.target.checked;

    this.clicked.emit(this.expense);
  }

  setChecked(checked: boolean) {
    //alert(`${this.expense.id}: ${checked ? 'checked' : 'unchecked'}`);

    this.expense.selected = checked;

    if (this.expense.selected) {
      this.nativeElement.querySelector('input[type=checkbox]').checked = true;
    }
    else {
      this.nativeElement.querySelector('input[type=checkbox]').checked = false;
    }

    this.clicked.emit(this.expense);
  }

}
