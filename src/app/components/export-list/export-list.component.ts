import { Component, OnInit } from '@angular/core';
import { ExportItem } from '../../models/export-item';
import { ExpenseService } from '../../services/expense.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-export-list',
  templateUrl: './export-list.component.html',
  styleUrls: ['./export-list.component.css']
})
export class ExportListComponent implements OnInit {

  title = 'Export List';
  exportList: ExportItem[] = [];

  constructor(private expenseService: ExpenseService, private loaderService: LoaderService) {
    this.loaderService.showLoader();

    this.expenseService.getExportList()
      .subscribe(
        exportList => {
          this.exportList = exportList;
          this.loaderService.hideLoader();
        }
      );

  }

  ngOnInit() {
  }

}
