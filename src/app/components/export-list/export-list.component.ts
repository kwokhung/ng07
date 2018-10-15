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

  async clickItem(exportItem: ExportItem) {
    //alert(`${exportItem.id}: clicked`);
    this.loaderService.showLoader();

    await this.delay(1000);

    this.expenseService.getExportItemFile({ date: exportItem.date, batchNo: exportItem.batchNo })
      .subscribe(
        exportItemFile => {
          this.downloadFile(exportItemFile, 'application/octet-stream', 'export.csv');
          this.loaderService.hideLoader();
        }
      );
  }

  downloadFile(blob: Blob, type?: string, name?: string) {
    let newBlob;

    if (type) {
      newBlob = new Blob([blob], { type: type })
    }

    if (window.navigator && window.navigator.msSaveOrOpenBlob && false) {
      window.navigator.msSaveOrOpenBlob(newBlob);
    }
    else {
      let data = window.URL.createObjectURL(newBlob);
      let downloadLink = document.createElement('a');
      downloadLink.href = data;

      if (name) {
        downloadLink.download = name;
      }
      else {
        downloadLink.download = 'download.file';
      }

      downloadLink.click();

      setTimeout(() => {
        window.URL.revokeObjectURL(data);
      }, 100)
    }
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
