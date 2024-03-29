import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ZoneModel } from 'src/app/modules/branding/model/zone.model';
import { ZoneService } from 'src/app/modules/branding/services/zone/zone.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-zones',
  templateUrl: './all-zones.component.html',
  styleUrls: ['./all-zones.component.scss']
})
export class AllZonesComponent implements OnInit {
  public zoneList: ZoneModel[] = [];
  public errMsg: string = '';

  displayedColumns: string[] = ['name', 'size', 'description', 'action'];
  dataSource: MatTableDataSource<ZoneModel>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private zoneService: ZoneService, private _snackBar: MatSnackBar) {
    this.getAllZone();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  public deleteZone(id) {
    this.zoneService.deleteZone(id)
      .then(resp => {
        this._snackBar.open(resp, 'Done', { duration: 2000 });
        this.getAllZone();
      })
      .catch(err => {
        this.errMsg = err;
      })
  }

  public getAllZone() {
    this.zoneService.getZone()
      .then(resp => {
        this.dataSource = new MatTableDataSource<ZoneModel>(resp);
      })
      .catch(err => {
        this.errMsg = err;
      })
  }

  ngOnInit() {
  }

}
