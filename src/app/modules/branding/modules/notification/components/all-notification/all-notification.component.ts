import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NotificationModel } from 'src/app/modules/branding/model/notification.model';

@Component({
  selector: 'app-all-notification',
  templateUrl: './all-notification.component.html',
  styleUrls: ['./all-notification.component.scss']
})
export class AllNotificationComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'status',
    'totalImpr',
    'deliveredImpr',
    'delivery%',
    'activateDate',
    'expiryDate'
  ];
  dataSource: MatTableDataSource<NotificationModel>;



  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() { }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngOnInit() {
  }

}
