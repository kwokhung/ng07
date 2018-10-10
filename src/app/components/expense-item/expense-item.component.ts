import { Component, OnInit, Input } from '@angular/core';
import { Expense } from '../../models/expense';

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.css']
})
export class ExpenseItemComponent implements OnInit {

  @Input() expense: Expense;

  constructor() { }

  ngOnInit() {
  }

  click(e) {
    alert(`${this.expense.id}: ${e.target.checked ? 'checked' : 'unchecked'}`);
  }
}
