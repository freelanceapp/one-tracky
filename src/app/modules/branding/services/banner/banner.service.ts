import { Injectable } from '@angular/core';
import { BannerModel } from '../../model/banner.model';
import { BannerTypeEnum } from '../../enums/banner-type.enum';
import { HttpService } from '../http/http.service';
import { BrandingModule } from '../../branding.module';


@Injectable({
  providedIn: BrandingModule
})
export class BannerService {

  public baseUrl = 'banners/';

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
      if (typeof bannerId === 'number') {
        this.httpServce.get(this.baseUrl + bannerId + '/')
          .then(resp => {
            const banner = this.parseBanner([resp.data]);
            resolve(banner[0]);
          })
          .catch(err => {
            reject(err);
          });
      } else {
        this.httpServce.get(this.baseUrl)
          .then(resp => {
            const banner = this.parseBanner(resp.data);
            resolve(banner);
          })
          .catch(err => {
            reject(err);
          });
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
          const banner = this.parseBanner([resp.data]);
          resolve(banner[0]);
        })
        .catch(err => {
          reject(err);
        });
    });
  }



  /***
   * edit banner by banner id
   * @param bannerId id of banner
   * @param data data to send for edit
   */
  public editBanner(bannerId: number, data): Promise<BannerModel> {
    return new Promise((resolve, reject) => {
      this.httpServce.post('bannersupdate/' + bannerId + '/', data)
        .then(resp => {
          const banner = this.parseBanner([resp.data]);
          resolve(banner[0]);
        })
        .catch(err => {
          reject(err);
        });
    });
  }





  /**
   * delete banner with banner id
   * @param bannerId  id of banner
   */
  public deleteBanner(bannerId: number): Promise<string> {
    return new Promise((resoleve, reject) => {
      this.httpServce.delete(this.baseUrl + bannerId + '/')
        .then(resp => {
          resoleve(resp.message);
        })
        .catch(err => {
          reject(err);
        });
    });
  }


  /** parse data to Banner model */
  private parseBanner(banner) {
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
        code: b.htmltemplate,
        videoDelType: b.ext_bannertype,
        impressionPixel: b.impression_pixel,
        startPixel: b.start_pixel,
        quaterPixel: b.quater_pixel,
        midPixel: b.mid_pixel,
        thirdQuaterPixel: b.third_quater_pixel,
        endPixel: b.end_pixel,
        clickPixel: b.third_party_click,
        videoType: b.vast_video_type,
        mute: b.mute,
        bitrate: b.vast_video_bitrate,
        videoDeliveryMethod: b.vast_video_delivery,
        videoDuration: b.vast_video_duration,
        skip: b.skip,
        skipTime: b.skip_time
      })));
    }

    return bannerList;
  }
}





