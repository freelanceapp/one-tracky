import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  @Output() loaderStatusChanged = new EventEmitter();

  private loaderStatus: boolean = false;

  constructor() { }

  public get showloader(): boolean {
    return this.loaderStatus;
  }

  public set showloader(loaderVisibility: boolean) {
    this.loaderStatusChanged.emit(loaderVisibility);
    this.loaderStatus = loaderVisibility;
  }
}
