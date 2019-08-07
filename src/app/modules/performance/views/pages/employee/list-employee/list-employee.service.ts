import { Injectable } from '@angular/core';
import { PerformanceModule } from 'src/app/modules/performance/performance.module';
import { Observable } from 'rxjs';
// import { ListAdvertiser} from './list-advertiser.model';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

let t="037f1a5ff3105a0e4ec426d2ce65ecbe7752166c";

@Injectable({
    providedIn: PerformanceModule
})

export class ListEmployeeService {
  
    private _url:string ="http://company1.afmtool.com/company/"

    constructor(private httpclient : HttpClient) { }

    // Get All Employee
    getAllEmployee(): Observable<any>{

   
    let param_adv = new HttpParams().set('page', "1").set('page_size', "100").set('q' , "");

     return this.httpclient.get(this._url + "listEmployee/?" + param_adv ,  {
      headers : new HttpHeaders().set( 'Authorization', "Token  " + t)
    })
     
}
    // Get All Employee End


//Delete Employee 

  deleteEmployee(id):Observable<any>{
    return this.httpclient.delete(this._url + "deleteEmployeeView/" + id , {
      headers : new HttpHeaders().set( 'Authorization', "Token  " + t)
    })
  }
// Delete Employee End
}
