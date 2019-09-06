import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/modules/branding/services/dashboard/dashboard.service';
import { HomeModel } from 'src/app/modules/branding/model/home.model';
import { HttpService } from 'src/app/modules/branding/services/http/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public dashBoard: HomeModel = null;
  public errMsg: string = '';

  constructor(private dashboardService: DashboardService) {
  }

  public getdashboard() {
    this.dashboardService.getDashBoard()
      .then(resp => { this.dashBoard = resp; })
      .catch(err => {
        this.errMsg = err;
      });
  }
  ngOnInit() {
    this.getdashboard();
  }

}
