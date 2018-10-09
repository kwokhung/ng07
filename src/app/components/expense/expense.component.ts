import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  @Input() logo: string;

  title = 'Expense Voucher Export';

  constructor() { }

  ngOnInit() {
  }

}
