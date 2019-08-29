import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/modules/branding/services/dashboard/dashboard.service';
import { BannerService } from 'src/app/modules/branding/services/banner/banner.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboard: BannerService) { }

  ngOnInit() {
  }

}
