import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() logo: string;

  title = 'Expense Voucher Export';

  constructor() {
  }

  ngOnInit() {
    if (this.logo === undefined || this.logo === null || this.logo === '') {
      this.logo = './assets/angular.png';
    }
  }

}
