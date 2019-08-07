import { Injectable } from '@angular/core';
import { PerformanceModule } from 'src/app/modules/performance/performance.module';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { CampaignCategory } from './camp-category.model'

let t="037f1a5ff3105a0e4ec426d2ce65ecbe7752166c";

@Injectable({
    providedIn: PerformanceModule
})

export class ListCampaignCategoryService {
  
    private _url:string ="http://company1.afmtool.com/company/"

    constructor(private httpclient : HttpClient) { }

    // Camp Category List
    getAllCampCategory(): Observable<any>{

     return this.httpclient.get(this._url + "listCategory/",  {
      headers : new HttpHeaders().set( 'Authorization', "Token  " + t)
    })
     
}
    // Camp Category List End


//Delete Category 

  deleteCampCategory(id):Observable<any>{
    return this.httpclient.delete(this._url + "deleteCategory/" + id , {
      headers : new HttpHeaders().set( 'Authorization', "Token  " + t)
    })
  }
// Delete Category End
}
