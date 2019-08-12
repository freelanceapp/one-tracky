import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { WebsiteModel } from 'src/app/modules/branding/model/website.model';
import { WebsiteService } from 'src/app/modules/branding/services/website/website.service';

@Component({
  selector: 'app-all-website',
  templateUrl: './all-website.component.html',
  styleUrls: ['./all-website.component.scss']
})
export class AllWebsiteComponent implements OnInit {


  public errMsg: string = '';
  displayedColumns: string[] = ['domainName', 'updated', 'action'];
  dataSource: MatTableDataSource<WebsiteModel>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  constructor(
    private websitSerive: WebsiteService,
    private _snackBar: MatSnackBar,
  ) { }

  public getAllWebsite() {
    this.websitSerive.getWebsite()
      .then(resp => {
        console.log(resp)
        this.dataSource = new MatTableDataSource<WebsiteModel>(resp)
      })
      .catch(err => {
        this.errMsg = err;
      })
  }

  public deleteWebsite(id) {
    this.websitSerive.deleteWebsite(id)
      .then(msg => {
        this._snackBar.open(msg, 'Done', {
          duration: 2000,
        });
        this.getAllWebsite();
      })
  }


  ngOnInit() {
    this.getAllWebsite()
  }

}
