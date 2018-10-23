import { Component, OnInit, Input } from '@angular/core';
import { DuplicateInvoice } from '../../models/duplicate-invoice';

@Component({
  selector: 'app-duplicate-invoice-item',
  templateUrl: './duplicate-invoice-item.component.html',
  styleUrls: ['./duplicate-invoice-item.component.css']
})
export class DuplicateInvoiceItemComponent implements OnInit {

  @Input() duplicateInvoice: DuplicateInvoice;

  constructor() { }

  ngOnInit() {
  }

}
