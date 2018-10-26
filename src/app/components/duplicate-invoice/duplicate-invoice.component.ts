import { Component, OnInit } from '@angular/core';

import { DuplicateInvoice } from '../../models/duplicate-invoice';

import { ExpenseService } from '../../services/expense.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-duplicate-invoice',
  templateUrl: './duplicate-invoice.component.html',
  styleUrls: ['./duplicate-invoice.component.css']
})
export class DuplicateInvoiceComponent implements OnInit {

  title = 'Duplicate Invoice';

  duplicateInvoices: DuplicateInvoice[] = [];

  constructor(private expenseService: ExpenseService, private loaderService: LoaderService) {
  }

  async ngOnInit() {
    this.loaderService.showLoader();

    //await this.loaderService.delay(1000);

    this.expenseService.getAllDuplicateInvoices()
      .subscribe(
        duplicateInvoices => {
          this.duplicateInvoices = duplicateInvoices;
          this.loaderService.hideLoader();
        }
      );
  }

}
