import { Injectable } from '@angular/core';
import { BannerModel } from '../../model/banner.model';
import { BannerTypeEnum } from '../../enums/banner-type.enum';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  public baseUrl = 'banners/'

  constructor(private httpServce: HttpService) { }


  private bannerList: BannerModel[] = Array.from({ length: 20 }, (_, i) => new BannerModel(
    {
      bannerId: i,
      bannerName: 'Banner ' + i,
      bannerType: BannerTypeEnum.Html5,
      campaignId: i + 100,
      destinationUrl: 'http://google.com',
    }
  ));


  /**
   * get all banner and get banner with id 
   * @param bannerId id of banner
   */

  public getBanner(): Promise<BannerModel[]>;
  public getBanner(bannerId: number): Promise<BannerModel>;
  public getBanner(bannerId?: number): Promise<BannerModel | BannerModel[]> {
    return new Promise((resolve, reject) => {
      if (bannerId) {
        this.httpServce.get(this.baseUrl + bannerId + '/')
          .then(resp => {
            let banner = this.parseBanner([resp.data])
            resolve(banner[0])
          })
          .catch(err => {
            reject(err);
          })
      }
      else {
        this.httpServce.get(this.baseUrl)
          .then(resp => {
            let banner = this.parseBanner(resp.data)
          })
      }
    });
  }







  /**parse banner function start */


  public parseBanner(banner: any[]) {
    let bannerList: BannerModel[] = []
    if (banner) {
      bannerList = banner.map(b => {
        let _banner = new BannerModel();
        _banner.bannerId = b.Bannerid;
        _banner.campaignId = b.Campaignid;
        _banner.bannerType = b.Storagetype;
        _banner.bannerName = b.Description;
        _banner.width = b.width;
        _banner.height = b.Height;
        _banner.weight = b.weight;
        _banner.trackingPixel = b.Tracking_pixel;
        _banner.comments = b.Comments;
        _banner.keyword = b.Keyword;
        _banner.destinationUrl = b.Url;
        _banner.fileName = b.Filename;
        return _banner
      })
    }
    return bannerList
  }
  /**parse banner function end */

}





