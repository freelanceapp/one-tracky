import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {


  public get isOnline(): boolean {
    return navigator.onLine;
  }


  @Output() networkChanged = new EventEmitter();

  constructor() {

    window.addEventListener('online', (ev) => {
      this.networkChanged.emit(true);
    });

    window.addEventListener('offline', (ev) => {
      this.networkChanged.emit(false);
    });
  }



}
