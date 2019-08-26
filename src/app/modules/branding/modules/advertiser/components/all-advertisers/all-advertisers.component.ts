import { Component, OnInit, ViewChild } from '@angular/core';
import { AdvertiserService } from 'src/app/modules/branding/services/advertiser/advertiser.service';
import { AdvertiserModel } from 'src/app/modules/branding/model/advertiser.model';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { LoaderService } from 'src/app/modules/branding/services/loader/loader.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-all-advertisers',
  templateUrl: './all-advertisers.component.html',
  styleUrls: ['./all-advertisers.component.scss']
})
export class AllAdvertisersComponent implements OnInit {

  public isNewAdvertiser: boolean = true;

  displayedColumns: string[] = ['select', 'advertiserId', 'fullName', 'phoneNo', 'email', 'Campaign', 'action'];
  dataSource: MatTableDataSource<AdvertiserModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<AdvertiserModel>(true, []);


  public advertisersList: AdvertiserModel[] = [];

  constructor(
    private advertiserSvc: AdvertiserService,
    private loaderSvc: LoaderService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getAllAdvertisers();
  }

  private getAllAdvertisers() {
    this.loaderSvc.showloader = true;
    this.advertiserSvc.getAdvertisers().then(advs => {
      this.advertisersList = advs;
      this.updateTable();
    }).catch(err => alert(err))
      .finally(() => this.loaderSvc.showloader = false);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private updateTable() {

    if (this.selection.hasValue()) {
      this.selection.clear();
    }
    this.dataSource = new MatTableDataSource(this.advertisersList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public deleteAdvertiser(advertiserId: number) {
    if (!confirm('Are you sure to delete this Advertiser')) {
      return;
    }
    this.loaderSvc.showloader = true;
    this.advertiserSvc.deleteAdvertiser(advertiserId)
      .then(msg => {
        this.snackBar.open(msg, 'Ok');
        const index = this.advertisersList.findIndex(adv => adv.advertiserId === advertiserId);
        this.advertisersList.splice(index, 1);
        this.updateTable();
      })
      .catch(err => this.snackBar.open(err, 'Ok'))
      .finally(() => this.loaderSvc.showloader = false);
  }


  public deleteSelected() {
    const selectedAdvertisers: AdvertiserModel[] = this.selection.selected;

  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

}
