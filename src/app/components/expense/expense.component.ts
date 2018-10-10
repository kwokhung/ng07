import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Expense } from '../../models/expense';

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

  expenses: Expense[] = [
    {
      'id': 1,
      'applicationDate': '20181001',
      'applicationNo': 'App-01',
      'payee': '16990'
    },
    {
      'id': 2,
      'applicationDate': '20181002',
      'applicationNo': 'App-02',
      'payee': '59990'
    }
  ];

  constructor() { }

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

}
