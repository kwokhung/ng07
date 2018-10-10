import { Component, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Expense } from '../../models/expense';

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.css']
})
export class ExpenseItemComponent implements OnInit {

  @Input() expense: Expense;
  @Output() clicked = new EventEmitter<Expense>();

  nativeElement: any;

  constructor(private element: ElementRef) {
    this.nativeElement = element.nativeElement;
  }

  ngOnInit() {
    if (this.expense.status === 'Exported') {
      //console.log(this.nativeElement);
      //console.log(this.nativeElement.querySelector('.card'));
      this.nativeElement.querySelector('.card').classList.remove('bg-primary');
      this.nativeElement.querySelector('.card').classList.add('bg-danger');
    }
  }

  click(e) {
    //alert(`${this.expense.id}: ${e.target.checked ? 'checked' : 'unchecked'}`);
    this.expense.selected = (e.target.checked ? true : false);
    this.clicked.emit(this.expense);
  }
}
