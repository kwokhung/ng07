import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ExportItem } from '../../models/export-item';
import { SearchExportCriteria } from '../../models/search-export-criteria';

import { ExpenseService } from '../../services/expense.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-export-list',
  templateUrl: './export-list.component.html',
  styleUrls: ['./export-list.component.css']
})
export class ExportListComponent implements OnInit {

  nativeElement: any;

  title = 'Export List';
  searchForm: FormGroup;
  date: FormControl;

  exportList: ExportItem[] = [];

  constructor(private element: ElementRef, private expenseService: ExpenseService, private loaderService: LoaderService) {
    this.nativeElement = element.nativeElement;
  }

  async ngOnInit() {
    this.date = new FormControl();

    this.searchForm = new FormGroup({
      'date': this.date
    });

    let now = new Date();
    let today = `${now.getFullYear()}${(now.getMonth() + 1 < 10 ? '0' : '')}${now.getMonth() + 1}${(now.getDate() < 10 ? '0' : '')}${now.getDate()}`;

    this.date.setValue(today);
    this.search(this.searchForm.value);

    /*this.loaderService.showLoader();

    await this.delay(1000);

    this.expenseService.getWholeExportList()
      .subscribe(
        exportList => {
          this.exportList = exportList;
          this.loaderService.hideLoader();
        }
      );*/
  }

  async search(parameter: SearchExportCriteria) {
    this.loaderService.showLoader();

    await this.delay(1000);

    this.expenseService.getExportList(parameter)
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

    if (!name) {
      name = 'download.file';
    }

    if (type) {
      newBlob = new Blob([blob], { type: type })
    }

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob, name);
    }
    else {
      let data = window.URL.createObjectURL(newBlob);
      let downloadLink = document.createElement('a');

      downloadLink.href = data;
      downloadLink.download = name;

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
