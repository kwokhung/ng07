import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

import { MatDialog } from "@angular/material";

import { SimpleDialogComponent } from "../components/simple-dialog/simple-dialog.component";

export enum MessageBoxButton {
  None = -1,
  Ok = 0,
  OkCancel = 1,
  YesNo = 2,
  AcceptReject = 3
}

export enum MessageBoxStyle {
  Simple = 0,
  Full = 1
};

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private message = new Subject<any>();

  constructor() {
  }

  sendMessage(message: string, type = 1) {
    this.message.next({ text: message, type: type });
  }

  getMessage(): Observable<any> {
    return this.message.asObservable();
  }

  clearMessage() {
    this.message.next();
  }

  show(dialog: MatDialog, message, title = "Alert", information = "", button = 0, allow_outside_click = false, style = 0, width = "200px") {
    const dialogRef = dialog.open(SimpleDialogComponent, {
      data: {
        title: title || "Alert",
        message: message,
        information: information,
        button: button || 0,
        style: style || 0,
        allow_outside_click: allow_outside_click || false
      },
      width: width
    });

    return dialogRef.afterClosed();
  }

}
