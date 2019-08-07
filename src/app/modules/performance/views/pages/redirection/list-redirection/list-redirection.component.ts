import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ListRedirectionService } from './list-redirection.service';
import { ListRedirection } from './list-redirection.model';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { Router } from '@angular/router'
import { FormBuilder, Validators } from '@angular/forms';  

@Component({
  selector: 'app-list-redirection',
  templateUrl: './list-redirection.component.html',
  styleUrls: ['./list-redirection.component.scss']
})
export class ListRedirectionComponent implements OnInit {
  message = null;  
  isValid = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'publisher_name', 'campaign_name', 'city', 'device', 'operator', 'action'];
  dataSource: MatTableDataSource<ListRedirection>;

  constructor(
    private _ListRedirectionService: ListRedirectionService,
    private _router:Router
    ) {
  }

  lstRedirection: ListRedirection[];

  ngOnInit() {
    this.getData();
  }


editCategory(id){
 this._router.navigate(['../performance/edit-redirection', id])
}

  getData() {
    this._ListRedirectionService.getAllRedirection()
      .subscribe(
        data => {
          this.lstRedirection = data.data;
          this.dataSource = new MatTableDataSource(this.lstRedirection);
          this.dataSource.paginator = this.paginator;
          console.log("Redirection List", this.lstRedirection);
        }
      );
  }

  delete(obj) {
    console.log("delete data");
    this._ListRedirectionService.deleteRedirection(obj)
      .subscribe( () =>
        {
          this.getData();
          this.isValid=true;
          this.message="Data Deleted Successfully"
          setTimeout(()=>{ 
            this.isValid=false;
          },1000)
        }
      );
  }

}
