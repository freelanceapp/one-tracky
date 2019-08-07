import { Component, OnInit, ViewChild } from '@angular/core';
import { ListPublisherService } from './list-publisher.service';
import { ListPublisher } from './list-publisher.model';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-list-publisher',
  templateUrl: './list-publisher.component.html',
  styleUrls: ['./list-publisher.component.scss']
})
export class ListPublisherComponent implements OnInit {
  message = null;
  isValid = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'username', 'email', 'created_at', 'currency', 'action'];

  dataSource: MatTableDataSource<ListPublisher>;

  constructor(
    private _ListPublisherService: ListPublisherService
  ) {

  }

  lstPublisher: ListPublisher[];

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._ListPublisherService.getAllPublisher()
      .subscribe(
        data => {
          this.lstPublisher = data.data.results;
          this.dataSource = new MatTableDataSource(this.lstPublisher);
          this.dataSource.paginator = this.paginator;
          console.log("lstPublisher", this.lstPublisher);
        }
      );
  }

  delete(obj) {
    console.log("delete data");
    this._ListPublisherService.deletePublisher(obj)
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
