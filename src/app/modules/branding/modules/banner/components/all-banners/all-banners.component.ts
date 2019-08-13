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
  public errMsg: string = ''

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bannerService: BannerService, private snackbar: MatSnackBar) { }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




  public getBanner() {
    this.bannerService.getBanner()
      .then(resp => {
        console.log(resp)
        this.dataSource = new MatTableDataSource<BannerModel>(resp)
      })
      .catch(err => {
        this.errMsg = err;
      })
  }



  public deleteBanner(id) {
    this.bannerService.deleteBanner(id)
      .then(msg => {
        this.getBanner()
        this.snackbar.open(msg, 'Done', { duration: 2000, })
      })
  }

  ngOnInit() {
    this.getBanner()
  }

}
