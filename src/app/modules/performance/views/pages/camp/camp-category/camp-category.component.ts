import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ListCampaignCategoryService } from './camp-category.service';
import { CampaignCategory } from './camp-category.model';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { Router } from '@angular/router'
import { FormBuilder, Validators } from '@angular/forms';  


@Component({
  selector: 'app-camp-category',
  templateUrl: './camp-category.component.html',
  styleUrls: ['./camp-category.component.scss']
})
export class CampCategoryComponent implements OnInit {
  message = null;  
  isValid = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<CampaignCategory>;

  constructor(
    private _ListCampaignCategoryService: ListCampaignCategoryService,
    private _router:Router
    ) {
  }

  campCategory: CampaignCategory[];

  ngOnInit() {
    this.getData();
  }


editCategory(id){
 this._router.navigate(['../performance/camp-category-edit', id])
}

  getData() {
    this._ListCampaignCategoryService.getAllCampCategory()
      .subscribe(
        data => {
          this.campCategory = data.data;
          this.dataSource = new MatTableDataSource(this.campCategory);
          this.dataSource.paginator = this.paginator;
          console.log("campCategory", this.campCategory);
        }
      );
  }

  delete(obj) {
    console.log("delete data");
    this._ListCampaignCategoryService.deleteCampCategory(obj)
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
