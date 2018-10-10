import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Expense } from '../../models/expense';

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.css']
})
export class ExpenseItemComponent implements OnInit {

  @Input() expense: Expense;
  @Output() clicked = new EventEmitter<Expense>();

  constructor() { }

  ngOnInit() {
  }

  click(e) {
    //alert(`${this.expense.id}: ${e.target.checked ? 'checked' : 'unchecked'}`);
    this.expense.selected = (e.target.checked ? true : false);
    this.clicked.emit(this.expense);
  }
}
