import { Component, OnInit, ViewChild } from '@angular/core';
import { AdvertiserService } from 'src/app/modules/branding/services/advertiser/advertiser.service';
import { AdvertiserModel } from 'src/app/modules/branding/model/advertiser.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { LoaderService } from 'src/app/modules/branding/services/loader/loader.service';

@Component({
  selector: 'app-all-advertisers',
  templateUrl: './all-advertisers.component.html',
  styleUrls: ['./all-advertisers.component.scss']
})
export class AllAdvertisersComponent implements OnInit {

  public isNewAdvertiser: boolean = true;

  displayedColumns: string[] = ['advertiserId', 'fullName', 'phoneNo', 'email', 'Campaign', 'action'];
  dataSource: MatTableDataSource<AdvertiserModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  public advertisersList: AdvertiserModel[] = [];

  constructor(
    private advertiserSvc: AdvertiserService,
    private loaderSvc: LoaderService
  ) { }

  ngOnInit() {
    this.getAllAdvertisers();
  }

  private getAllAdvertisers() {
    this.loaderSvc.showloader = true;
    this.advertiserSvc.getAdvertisers().then(advs => {
      this.advertisersList = advs;
      this.dataSource = new MatTableDataSource(this.advertisersList);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 100);

    }).catch(err => alert(err))
      .finally(() => this.loaderSvc.showloader = false);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  public deleteAdvertiser(advertiserId: number) {
    if (!confirm('Are you sure to delete this Advertiser')) {
      return;
    }
    this.loaderSvc.showloader = true;
    this.advertiserSvc.deleteAdvertiser(advertiserId)
      .then(msg => alert(msg))
      .catch(err => alert(err))
      .finally(() => this.loaderSvc.showloader = false);
  }
}
