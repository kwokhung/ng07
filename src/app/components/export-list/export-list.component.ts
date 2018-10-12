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
  }

  async ngOnInit() {
    this.loaderService.showLoader();

    await this.delay(1000);

    this.expenseService.getExportList()
      .subscribe(
        exportList => {
          this.exportList = exportList;
          this.loaderService.hideLoader();
        }
      );
  }

  clickItem(exportItem: ExportItem) {
    //alert(`${exportItem.id}: clicked`);
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
