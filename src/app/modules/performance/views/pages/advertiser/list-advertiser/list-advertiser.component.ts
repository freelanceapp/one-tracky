import { Component, OnInit, ViewChild } from '@angular/core';
import { ListAdvertiserService } from './list-advertiser.service';
import { ListAdvertiser } from './list-advertiser.model';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-list-advertiser',
  templateUrl: './list-advertiser.component.html',
  styleUrls: ['./list-advertiser.component.scss']
})
export class ListAdvertiserComponent implements OnInit {
  isValid = false;
  message = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'username', 'email', 'created_at', 'currency', 'action'];

  dataSource: MatTableDataSource<ListAdvertiser>;

  constructor(
    private _ListAdvertiseService: ListAdvertiserService
  ) {

  }

  lstAdvertiser: ListAdvertiser[] = [];

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._ListAdvertiseService.getAllAdvertiser()
      .subscribe(
        data => {
          this.lstAdvertiser = data.data.results;
          this.dataSource = new MatTableDataSource(this.lstAdvertiser);
          this.dataSource.paginator = this.paginator;
          console.log("lstAdvertiser", this.lstAdvertiser);
        }
      );
  }

  delete(obj) {
    console.log("delete data");
    this._ListAdvertiseService.deleteAdvertiser(obj)
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

