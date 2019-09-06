import { Component, OnInit, ViewChild } from '@angular/core';
import { AdvertiserService } from 'src/app/modules/branding/services/advertiser/advertiser.service';
import { AdvertiserModel } from 'src/app/modules/branding/model/advertiser.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { LoaderService } from 'src/app/modules/branding/services/loader/loader.service';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-all-advertisers',
  templateUrl: './all-advertisers.component.html',
  styleUrls: ['./all-advertisers.component.scss']
})
export class AllAdvertisersComponent implements OnInit {

  public isNewAdvertiser: boolean = true;

  selection = new SelectionModel<AdvertiserModel>(true, []);

  displayedColumns: string[] = ['select', 'advertiserId', 'fullName', 'phoneNo', 'email', 'Campaign', 'action'];
  dataSource: MatTableDataSource<AdvertiserModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  public advertisersList: AdvertiserModel[] = [];

  constructor(
    private advertiserSvc: AdvertiserService,
    private loaderSvc: LoaderService
  ) { }

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
  checkboxLabel(row?: AdvertiserModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.advertiserId}`;
  }


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
      }, 1000);

    }).catch(err => alert(err))
      .finally(() => this.loaderSvc.showloader = false);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  private getCheckBoxId(): number[] {
    const advId = this.selection.selected.map(avd => avd.advertiserId)
    return advId;
  }



  public deleteSelectedAdvertiser() {
    if (!confirm('Are you sure to delete this Advertiser')) {
      return;
    }
    this.loaderSvc.showloader = true;
    this.advertiserSvc.deleteAdvertiser(this.getCheckBoxId())
      .then(msg => alert(msg))
      .catch(err => alert(err))
      .finally(() => {
        this.loaderSvc.showloader = false;
        this.selection.clear();
      }
      );
  }
}
