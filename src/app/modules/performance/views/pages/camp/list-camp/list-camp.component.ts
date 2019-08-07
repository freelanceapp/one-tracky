import { Component, OnInit, ViewChild } from '@angular/core';
import { ListCampaignService } from './list-camp.service';
import { ListCampaign } from './list-camp.model';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { Router } from '@angular/router'
import { FormBuilder, Validators } from '@angular/forms';  


@Component({
  selector: 'app-list-camp',
  templateUrl: './list-camp.component.html',
  styleUrls: ['./list-camp.component.scss']
})
export class ListCampComponent implements OnInit {
  isValid = false;
  message = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'campaign', 'status', 'advertiser', 'category', 'visibility', 'objective', 'adv_id', 'payout', 'revenue', 'action'];

  dataSource: MatTableDataSource<ListCampaign>;

  constructor(
    private _ListCampaignService: ListCampaignService,
    private _router:Router
  ) {

  }

  lstCampaign: ListCampaign[] = [];

  ngOnInit() {
    this.getData();
  }

  editCampaign(id){
    this._router.navigate(['../performance/edit-page', id])
   }

  getData() {
    this._ListCampaignService.getAllCampaign()
      .subscribe(
        data => {
          this.lstCampaign = data.data;
          this.dataSource = new MatTableDataSource(this.lstCampaign);
          this.dataSource.paginator = this.paginator;
          console.log("lstCampaign", this.lstCampaign);
        }
      );
  }

  delete(obj) {
    console.log("delete data");
    this._ListCampaignService.deleteCampaign(obj)
      .subscribe(() => {
        this.getData();
        this.isValid = true;
        this.message = "Data Deleted Successfully"
        setTimeout(() => {
          this.isValid = false;
        }, 1000)
      }
      );
  }


}

