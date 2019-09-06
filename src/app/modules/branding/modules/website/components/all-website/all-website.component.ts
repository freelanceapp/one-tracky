import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { WebsiteModel } from 'src/app/modules/branding/model/website.model';
import { WebsiteService } from 'src/app/modules/branding/services/website/website.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-all-website',
  templateUrl: './all-website.component.html',
  styleUrls: ['./all-website.component.scss']
})
export class AllWebsiteComponent implements OnInit {


  public errMsg: string = '';
  displayedColumns: string[] = ['select', 'domainName', 'updated', 'action'];
  dataSource: MatTableDataSource<WebsiteModel>;
  selection = new SelectionModel<WebsiteModel>(true, []);


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
    private snackBar: MatSnackBar,
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
  checkboxLabel(row?: WebsiteModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.affiliateId}`;
  }


  public getAllWebsite() {
    this.websitSerive.getWebsite()
      .then(resp => {
        this.dataSource = new MatTableDataSource<WebsiteModel>(resp);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        }, 1000);
      })
      .catch(err => {
        this.errMsg = err;
      });
  }

  public deleteWebsite() {
    if (!confirm('Are you sure to delete this user ?')) {
      return;
    }
    this.websitSerive.deleteWebsite(this.getCheckBoxId())
      .then(msg => {
        this.snackBar.open(msg, 'Done', {
          duration: 2000,
        });
        this.getAllWebsite();
      })
      .catch(err => {
        this.errMsg = err;
      })
      .finally(() => {
        this.selection.clear();
      });
  }
  private getCheckBoxId(): number[] {
    const webId = this.selection.selected.map(web => web.affiliateId);
    return webId;
  }
  ngOnInit() {
    this.getAllWebsite();
  }
}
