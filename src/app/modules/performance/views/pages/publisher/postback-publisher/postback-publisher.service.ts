import { Injectable } from '@angular/core';
import { PerformanceModule } from 'src/app/modules/performance/performance.module';
import { Observable } from 'rxjs';
// import { ListAdvertiser} from './list-advertiser.model';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

let t="037f1a5ff3105a0e4ec426d2ce65ecbe7752166c";

@Injectable({
    providedIn: PerformanceModule
})

export class AllPostbackPublisherService {
  
    // private header;
    // private param;
    private _url:string ="http://company1.afmtool.com/company/"

    constructor(private httpclient : HttpClient) { }

    // Get All Publisher
    getAllPubPostback(): Observable<any>{

   
    let param_adv = new HttpParams().set('page_size', "100").set('page', "1");

    // var headers_object = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //    'Authorization': "Token  " + t
    // });
     return this.httpclient.get(this._url + "listPostback/?" + param_adv ,  {
      headers : new HttpHeaders().set( 'Authorization', "Token  " + t)
    })
     
}
// Get All Publisher End

}
