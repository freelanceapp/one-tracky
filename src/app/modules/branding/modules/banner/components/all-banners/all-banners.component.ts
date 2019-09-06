import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { BannerModel } from 'src/app/modules/branding/model/banner.model';
import { BannerService } from 'src/app/modules/branding/services/banner/banner.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-all-banners',
  templateUrl: './all-banners.component.html',
  styleUrls: ['./all-banners.component.scss']
})
export class AllBannersComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'date', 'details'];
  dataSource: MatTableDataSource<BannerModel>;
  public errMsg: string = '';
  selection = new SelectionModel<BannerModel>(true, []);

  private bannerList: BannerModel[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bannerService: BannerService, private snackbar: MatSnackBar) {
    this.getBanner();
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
  checkboxLabel(row?: BannerModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.bannerId}`;
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

    this.bannerService.deleteBanner(this.getCheckBoxId())
      .then(msg => {
        const index = this.bannerList.findIndex(banner => banner.bannerId === bannerId);
        this.bannerList.splice(index, 1);
        this.updateBannerTable();
        this.snackbar.open(msg, 'Done', { duration: 2000, });
      }).catch(err => alert(err))
      .finally(() => {
        this.selection.clear();
      });
  }


  private getCheckBoxId(): number[] {
    const bnrId = this.selection.selected.map(bnr => bnr.bannerId);
    return bnrId;
  }
  ngOnInit() {

  }

}
