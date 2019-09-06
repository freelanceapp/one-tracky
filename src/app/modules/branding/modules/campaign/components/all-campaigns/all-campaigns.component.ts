import { Component, OnInit, ViewChild } from '@angular/core';
import { CampaignService } from 'src/app/modules/branding/services/campaign/campaign.service';
import { CampaignModel } from 'src/app/modules/branding/model/campaign.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-all-campaigns',
  templateUrl: './all-campaigns.component.html',
  styleUrls: ['./all-campaigns.component.scss']
})
export class AllCampaignsComponent implements OnInit {


  displayedColumns: string[] = ['select', 'campaignName', 'startDate', 'status', 'campaigns'];
  dataSource: MatTableDataSource<CampaignModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public campaigns: CampaignModel[] = [];
  selection = new SelectionModel<CampaignModel>(true, []);

  constructor(private campaignSvc: CampaignService, private actRoute: ActivatedRoute) {
    this.getCampaings();
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CampaignModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.campaignId}`;
  }
  ngOnInit() {
  }

  private async getCampaings() {
    const advertiserId: number = parseInt(this.actRoute.snapshot.paramMap.get('advertiserId'), 10);
    if (advertiserId) {
      this.campaignSvc.getAdvertiserCampaigns(advertiserId)
        .then(campaigns => {
          this.campaigns = campaigns;
          this.updateCampaignsTable();
        })
        .catch(err => alert(err));
    } else {
      this.campaigns = await this.campaignSvc.getCampaigns();
      this.updateCampaignsTable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private updateCampaignsTable() {
    this.dataSource = new MatTableDataSource(this.campaigns);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteCampaign(campaignId: number) {
    if (confirm('Are you sure to delete this campaign')) {
      this.campaignSvc.deleteCampaign(this.getCheckBoxId())
        .then(msg => {
          alert(msg);
          const index = this.campaigns.findIndex(cmp => cmp.campaignId === campaignId);
          this.campaigns.splice(index, 1);
          this.updateCampaignsTable();
        })
        .catch(err => alert(err))
        .finally(() => {
          this.selection.clear();
        });
    }
  }

  private getCheckBoxId(): number[] {
    const cmpId = this.selection.selected.map(cmp => cmp.campaignId);
    return cmpId;
  }

}
