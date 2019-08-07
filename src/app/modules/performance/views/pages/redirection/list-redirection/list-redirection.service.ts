import { Injectable } from '@angular/core';
import { PerformanceModule } from 'src/app/modules/performance/performance.module';
import { Observable } from 'rxjs';
// import { ListAdvertiser} from './list-advertiser.model';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

let t="037f1a5ff3105a0e4ec426d2ce65ecbe7752166c";

@Injectable({
    providedIn: PerformanceModule
})

export class ListRedirectionService {
  
    private _url:string ="http://company1.afmtool.com/company/"

    constructor(private httpclient : HttpClient) { }

    // Get All Redirection
    getAllRedirection(): Observable<any>{
     return this.httpclient.get(this._url + "listRedirection/",  {
      headers : new HttpHeaders().set( 'Authorization', "Token  " + t)
    })  
}
    // Get All Redirection End


//Delete Redirection 

  deleteRedirection(id):Observable<any>{
    return this.httpclient.delete(this._url + "deleteRedirection/" + id , {
      headers : new HttpHeaders().set( 'Authorization', "Token  " + t)
    })
  }
// Delete Redirection End
}
