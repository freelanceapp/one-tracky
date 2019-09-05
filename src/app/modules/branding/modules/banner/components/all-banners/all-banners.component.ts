import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { BannerModel } from 'src/app/modules/branding/model/banner.model';
import { BannerService } from 'src/app/modules/branding/services/banner/banner.service';

@Component({
  selector: 'app-all-banners',
  templateUrl: './all-banners.component.html',
  styleUrls: ['./all-banners.component.scss']
})
export class AllBannersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'date', 'details', 'action'];
  dataSource: MatTableDataSource<BannerModel>;
  public errMsg: string = '';

  private bannerList: BannerModel[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bannerService: BannerService, private snackbar: MatSnackBar) {
    this.getBanner();
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getBanner() {
    this.bannerService.getBanner()
      .then(banners => {
        this.bannerList = banners;
        this.updateBannerTable();
      })
      .catch(err => {
        this.errMsg = err;
      });
  }

  private updateBannerTable() {
    this.dataSource = new MatTableDataSource<BannerModel>(this.bannerList);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 100);
  }

  public deleteBanner(bannerId: number) {
    if (!confirm('Are you sure to delete this banner ?')) {
      return;
    }
    this.bannerService.deleteBanner(bannerId)
      .then(msg => {
        const index = this.bannerList.findIndex(banner => banner.bannerId === bannerId);
        this.bannerList.splice(index, 1);
        this.updateBannerTable();
        this.snackbar.open(msg, 'Done', { duration: 2000, });
      }).catch(err => alert(err));
  }

  ngOnInit() {

  }

}
