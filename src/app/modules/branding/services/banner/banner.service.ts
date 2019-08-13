import { Injectable } from '@angular/core';
import { BannerModel } from '../../model/banner.model';
import { BannerTypeEnum } from '../../enums/banner-type.enum';
import { HttpService } from '../http/http.service';
import { BrandingModule } from '../../branding.module';


@Injectable({
  providedIn: BrandingModule
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
            let banner = this.parseBanner(resp.data);
            resolve(banner)
          })
          .catch(err => {
            reject(err)
          })
      }
    });
  }


  /**
   * add new banner 
   * @param data form data
   */


  public addBanner(data): Promise<BannerModel> {
    return new Promise((resolve, reject) => {
      this.httpServce.post(this.baseUrl, data)
        .then(resp => {
          let banner = this.parseBanner([resp.data]);
          resolve(banner[0]);
        })
        .catch(err => {
          reject(err);
        })
    })
  }



  /***
   * edit banner by banner id  
   * @param bannerId id of banner 
   * @param data data to send for edit
   */
  public editBanner(bannerId: number, data): Promise<BannerModel> {
    return new Promise((resolve, reject) => {
      this.httpServce.put(this.baseUrl + bannerId + '/', data)
        .then(resp => {
          let banner = this.parseBanner([resp.data]);
          resolve(banner[0]);
        })
        .catch(err => {
          reject(err)
        })
    })
  }





  /**
   * delete banner with banner id 
   * @param bannerId  id of banner
   */
  public deleteBanner(bannerId: number): Promise<string> {
    return new Promise((resoleve, reject) => {
      this.httpServce.delete(this.baseUrl + bannerId + "/")
        .then(resp => {
          resoleve(resp.message)
        })
        .catch(err => {
          reject(err)
        })
    })
  }


  /**parse banner function start */
  private parseBanner(banner: any[]) {
    let bannerList: BannerModel[] = [];
    if (banner) {
      bannerList = banner.map((b => new BannerModel({
        bannerId: b.bannerid,
        campaignId: b.campaignid,
        bannerType: b.storagetype,
        bannerName: b.description,
        bannerImage: b.bannerImage,
        width: b.width,
        height: b.height,
        weight: b.weight,
        trackingPixel: b.tracking_pixel,
        comments: b.comments,
        keyword: b.keyword,
        destinationUrl: b.url,
        fileName: b.filename,
        updated: b.updated,
      })))
    }
    return bannerList
  }
  /**parse banner function end */






}





