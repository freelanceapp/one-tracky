import { Component, OnInit, ViewChild } from '@angular/core';
import { CampaignService } from 'src/app/modules/branding/services/campaign/campaign.service';
import { CampaignModel } from 'src/app/modules/branding/model/campaign.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-all-campaigns',
  templateUrl: './all-campaigns.component.html',
  styleUrls: ['./all-campaigns.component.scss']
})
export class AllCampaignsComponent implements OnInit {


  displayedColumns: string[] = ['campaignName', 'status', 'campaigns', 'details'];
  dataSource: MatTableDataSource<CampaignModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public campaigns: CampaignModel[] = [];

  constructor(private campaignSvc: CampaignService) {
    this.getCampaings();
  }

  ngOnInit() {
  }

  private async getCampaings() {
    this.campaigns = await this.campaignSvc.getCampaigns();
    this.dataSource = new MatTableDataSource(this.campaigns);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
