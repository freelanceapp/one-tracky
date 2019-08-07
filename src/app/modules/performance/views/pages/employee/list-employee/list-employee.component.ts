import { Component, OnInit, ViewChild } from '@angular/core';
import { ListEmployeeService } from './list-employee.service';
import { ListEmployee } from './list-employee.modal';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  message = null;
  isValid = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'username', 'email', 'action'];

  dataSource: MatTableDataSource<ListEmployee>;

  constructor(
    private _ListEmployeeService: ListEmployeeService
  ) {

  }

  lstEmployee: ListEmployee[];

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._ListEmployeeService.getAllEmployee()
      .subscribe(
        data => {
          this.lstEmployee = data.data.results;
          this.dataSource = new MatTableDataSource(this.lstEmployee);
          this.dataSource.paginator = this.paginator;
          console.log("lstEmployee", this.lstEmployee);
        }
      );
  }

  delete(obj) {
    console.log("delete data");
    this._ListEmployeeService.deleteEmployee(obj)
      .subscribe(() => {
        this.getData();
        this.isValid = true;
        this.message = "Data Deleted Successfully"
        setTimeout(() => {
          this.isValid = false;
        }, 1000)
      }
      );
  }

}
