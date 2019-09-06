import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ZoneModel } from 'src/app/modules/branding/model/zone.model';
import { ZoneService } from 'src/app/modules/branding/services/zone/zone.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-all-zones',
  templateUrl: './all-zones.component.html',
  styleUrls: ['./all-zones.component.scss']
})
export class AllZonesComponent implements OnInit {
  public zoneList: ZoneModel[] = [];
  public errMsg: string = '';
  public websiteId: number = null;
  selection = new SelectionModel<ZoneModel>(true, []);

  displayedColumns: string[] = ['select', 'name', 'size', 'zone-Type', 'description', 'action'];
  dataSource: MatTableDataSource<ZoneModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private zoneService: ZoneService, private snackBar: MatSnackBar, private activatedRoute: ActivatedRoute) {
    this.websiteId = parseInt(this.activatedRoute.snapshot.paramMap.get('websiteId'), 10);
    if (this.websiteId) {
      this.getAllZoneBywebId();
    } else {
      this.getAllZone();
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
  checkboxLabel(row?: ZoneModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.zoneId}`;
  }
  public deleteZone(id) {
    this.zoneService.deleteZone(id)
      .then(resp => {
        this.snackBar.open(resp, 'Done', { duration: 2000 });
        this.getAllZone();
      })
      .catch(err => {
        this.errMsg = err;
      });
  }

  public getAllZone() {
    this.zoneService.getZone()
      .then(resp => {
        this.dataSource = new MatTableDataSource<ZoneModel>(resp);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }, 0);
      })
      .catch(err => {
        this.errMsg = err;
      });
  }

  public getAllZoneBywebId() {
    this.zoneService.getZonesbyWebsiteId(this.websiteId)
      .then(resp => {
        this.dataSource = new MatTableDataSource<ZoneModel>(resp);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }, 1000);
      })
      .catch(err => {
        this.errMsg = err;
      });
  }

  ngOnInit() {
  }

}
