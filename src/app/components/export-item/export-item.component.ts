import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExportItem } from '../../models/export-item';

@Component({
  selector: 'app-export-item',
  templateUrl: './export-item.component.html',
  styleUrls: ['./export-item.component.css']
})
export class ExportItemComponent implements OnInit {

  @Input() exportItem: ExportItem;
  @Output() clicked = new EventEmitter<ExportItem>();

  constructor() { }

  ngOnInit() {
  }

  click(e) {
    alert(`${this.exportItem.id}: ${e.target.checked ? 'checked' : 'unchecked'}`);
    this.clicked.emit(this.exportItem);
  }

}
