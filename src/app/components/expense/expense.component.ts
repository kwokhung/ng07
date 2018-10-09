import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  @Input() logo: string;

  title = 'Expense Voucher Export';
  likeCount = 0;
  dislikeCount = 0;

  constructor() { }

  ngOnInit() {
  }

  vote(type: string) {
    if (type === 'like') {
      this.likeCount++;
      alert(this.likeCount);
    }
    else {
      this.dislikeCount++;
      alert(this.dislikeCount);
    }
  }

}
