import { Injectable } from '@angular/core';
import { BannerModel } from '../../model/banner.model';
import { BannerTypeEnum } from '../../enums/banner-type.enum';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor() { }


  private bannerList: BannerModel[] = Array.from({ length: 20 }, (_, i) => new BannerModel(
    {
      bannerId: i,
      bannerName: 'Banner ' + i,
      bannerType: BannerTypeEnum.Html5,
      campaignId: i + 100,
      destinationUrl: 'http://google.com',
    }
  ));

  public getBanner() {
    return new Promise((resolve, reject) => {

    });
  }
}
