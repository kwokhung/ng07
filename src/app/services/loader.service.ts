import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  visible: boolean;

  constructor() { }

  showLoader() {
    this.visible = true;
  }

  hideLoader() {
    this.visible = false;
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
