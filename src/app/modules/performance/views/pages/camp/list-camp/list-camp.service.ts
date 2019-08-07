import { Injectable } from '@angular/core';
import { PerformanceModule } from 'src/app/modules/performance/performance.module';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

let t="037f1a5ff3105a0e4ec426d2ce65ecbe7752166c";

@Injectable({
    providedIn: PerformanceModule
})

export class ListCampaignService {

    private _url:string ="http://company1.afmtool.com/company/"

    constructor(private httpclient : HttpClient) { }

    // Get All Campaign
    getAllCampaign(): Observable<any>{
     return this.httpclient.get(this._url + "listCampaign/",  {
      headers : new HttpHeaders().set( 'Authorization', "Token  " + t)
    })   
}
// Get All Campaign End


//Delete Campaign 
  deleteCampaign(id):Observable<any>{
    return this.httpclient.delete(this._url + "deleteCampaign/" + id , {
      headers : new HttpHeaders().set( 'Authorization', "Token  " + t)
    })
  }
// Delete Campaign End
}
