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


  private parseHome(home) {
    let homeList: HomeModel = null;
    if (home) {
      homeList = home.map(h => {
        let _home = new HomeModel();

        if (h.clicks < 999) {
          _home.clicks = h.clicks;
        } else if (h.clicks > 999 && h.clicks < 999999) {
          _home.clicks = h.clicks / 1000 + 'K';
        } else if (h.clicks > 999999) {
          _home.clicks = h.clicks / 1000000 + 'M';
        }

        if (h.requests < 999) {
          _home.requests = h.requests;
        } else if (h.requests > 999 && h.requests < 999999) {
          _home.requests = h.requests / 1000 + 'K';
        } else if (h.requests > 999999) {
          _home.requests = h.requests / 1000000 + 'M';
        }

        if (h.impressions < 999) {
          _home.impressions = h.impressions;
        } else if (h.impressions > 999 && h.impressions < 999999) {
          _home.impressions = h.impressions / 1000 + ' K';
        } else if (h.impressions > 999999) {
          _home.impressions = h.impressions / 1000000 + ' M';
        }

        _home.revenue = h.revenue;
        _home.day = h.day;
        return _home;
      });
    }
    return homeList;
  }




}
