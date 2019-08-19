import { Component } from '@angular/core';
import { NetworkService } from './modules/branding/services/network/network.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public isOnline: boolean;

  constructor(networkService: NetworkService) {
    this.isOnline = networkService.isOnline;
    networkService.networkChanged.subscribe((networkStatus: boolean) => {
      this.isOnline = networkStatus;
    });
  }
}
