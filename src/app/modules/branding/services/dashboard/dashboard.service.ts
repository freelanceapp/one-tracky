import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HomeModel } from '../../model/home.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public baseUrl: string = 'home/';
  constructor(private httpServce: HttpService) {
  }

  /** get dashboard data  */

  public getDashBoard(): Promise<HomeModel> {
    return new Promise((resolve, reject) => {
      this.httpServce.get(this.baseUrl)
        .then(resp => {
          const home = this.parseHome(resp.data);
          resolve(home[0]);
        })
        .catch(err => {
          reject(err);
        });
    });
  }


 



}
