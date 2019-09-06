import { Injectable } from '@angular/core';
import { ZoneModel } from '../../model/zone.model';
import { BrandingModule } from '../../branding.module';
import { HttpService } from '../http/http.service';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { InvocationCodeModel } from '../../model/invocation-code.model';
import { HttpParams } from '@angular/common/http';
import { LinkBannerModel } from '../../model/link-banner.model';
import { AdvertiserModel } from '../../model/advertiser.model';
import { CampaignModel } from '../../model/campaign.model';
import { BannerModel } from '../../model/banner.model';


@Injectable({
  providedIn: BrandingModule
})
export class ZoneService {
  private baseUrl: string = 'zones/';
  constructor(private httpService: HttpService) {
  }


  /**
   * get all zone and zone BY ID
   * @param zoneId ID of zone
   */
  public getZone(): Promise<ZoneModel[]>;
  public getZone(zoneId: number): Promise<ZoneModel>;
  public getZone(zoneId?: number): Promise<ZoneModel | ZoneModel[]> {
    return new Promise((resolve, reject) => {
      if (zoneId) {
        this.httpService.get(this.baseUrl + zoneId)
          .then(resp => {
            const zone = this.parseZone([resp.data]);
            resolve(zone[0]);
          })
          .catch(err => {
            reject(err);
          });
      } else {
        this.httpService.get(this.baseUrl)
          .then(resp => {
            const zones = this.parseZone(resp.data);
            resolve(zones);
          })
          .catch(err => {
            reject(err);
          });
      }
    });
  }

  /**
   * add  new zone
   * @param data data to save
   */
  public addNewZone(data: ZoneModel): Promise<ZoneModel> {
    return new Promise((resolve, reject) => {
      let sendData = this.deparseZone(data);
      this.httpService.post(this.baseUrl, JSON.stringify(sendData))
        .then(resp => {
          const zone = this.parseZone([resp.data]);
          resolve(zone[0]);
        })
        .catch(err => {
          reject(err);
        });
    });
  }


  /**
   * delete zone by id 
   * @param Ids array of zone id 
   */
  public deleteZone(Ids: number[]): Promise<string> {
    return new Promise((resolve, reject) => {
      const data = {
        ids: Ids
      };
      const dataToSend = JSON.stringify(data);
      this.httpService.post(this.baseUrl + 'zonesdelete', dataToSend)
        .then(resp => {
          resolve(resp.message);
        })
        .catch(err => {
          reject(err);
        });
    });
  }





  /**
   * get zones by website id
   * @param websiteId id of website
   */
  public getZonesbyWebsiteId(websiteId: number): Promise<ZoneModel[]> {
    return new Promise((resolve, reject) => {
      this.httpService.get('affiliate/' + websiteId.toString() + '/zones/')
        .then(resp => {
          const zones = this.parseZone(resp.data);
          resolve(zones);
        }).catch(err => {
          reject(err);
        });
    });
  }



  /***
   * edit zone with id 
   * @param zoneId id of zone
   * @param data json of data for update 
   */

  public editZone(zoneId: number, data: ZoneModel): Promise<ZoneModel> {
    return new Promise((resolve, reject) => {
      let sendData = this.deparseZone(data);
      this.httpService.put(this.baseUrl + zoneId + '/', JSON.stringify(sendData))
        .then(resp => {
          const zone = this.parseZone([resp.data]);
          resolve(zone[0]);
        })
        .catch(err => {
          reject(err);
        });
    });
  }


  /**
   * get invocation code by website and zone id
   * @param websiteId id of affiliateid
   * @param zoneId  id of zone
   */


  public getInvocationCode(websiteId: number, zoneId: number, zoneType: string): Promise<InvocationCodeModel> {
    return new Promise((resolve, reject) => {
      let param = new HttpParams().set('zoneid', zoneId.toString()).set('affiliateid', websiteId.toString());
      if (zoneType === 'html') {
        this.httpService.get('zones-invocation-vast/', param)
          .then(rep => {
            const invocationCode = this.parseInvocation([rep.data]);
            resolve(invocationCode[0]);
          }).catch(err => {
            reject(err);
          });
      } else if (zoneType === 'html5' || zoneType === 'web') {
        this.httpService.get('zonesinvocation/', param)
          .then(rep => {
            const invocationCode = this.parseInvocation([rep.data]);
            resolve(invocationCode[0]);
          }).catch(err => {
            reject(err);
          });
      }

    });
  }

  public editInvocationCode(websiteId: number, zoneId: number, zoneType: string, thirdPartyTrack: string): Promise<InvocationCodeModel> {
    return new Promise((resolve, reject) => {
      let param = new HttpParams().set('zoneid', zoneId.toString()).set('affiliateid', websiteId.toString());
      const track = {
        thirdpartytrack: thirdPartyTrack
      };
      let data = JSON.stringify(track)
      if (zoneType === 'html') {
        this.httpService.post('zones-invocation-vast/', data, param)
          .then(resp => {
            const invocation = this.parseInvocation([resp.data]);
            resolve(invocation[0]);
          })
          .catch(err => {
            reject(err);
          });
      } else if (zoneType === 'html5' || zoneType === 'web') {
        this.httpService.post('zonesinvocation/', data, param)
          .then(resp => {
            const invocation = this.parseInvocation([resp.data]);
            resolve(invocation[0]);
          })
          .catch(err => {
            reject(err);
          });
      }
    });
  }




  public getLinkBannerData(websiteId: number, zoneId: number, advertiserId?: number, campaignId?: number): Promise<LinkBannerModel> {
    return new Promise((resolve, reject) => {
      let param = new HttpParams().set('affiliateid', websiteId.toString()).set('zoneid', zoneId.toString());

      if (websiteId && zoneId && advertiserId && campaignId) {
        let param = new HttpParams()
          .set('affiliateid', websiteId.toString())
          .set('zoneid', zoneId.toString())
          .set('clientid', advertiserId.toString())
          .set('campaignid', campaignId.toString());
        this.httpService.get('zonesinclude/', param)
          .then(resp => {
            const linkbanner = this.parseLinkBanner([resp.data])
            resolve(linkbanner[0]);
          })
          .catch(err => {
            reject(err);
          });
      } else if (websiteId && zoneId && advertiserId) {
        param = new HttpParams()
          .set('affiliateid', websiteId.toString())
          .set('zoneid', zoneId.toString())
          .set('clientid', advertiserId.toString());
        this.httpService.get('zonesinclude/', param)
          .then(resp => {
            const linkbanner = this.parseLinkBanner([resp.data])
            resolve(linkbanner[0]);
          })
          .catch(err => {
            reject(err);
          });

      } else if (websiteId && zoneId) {
        let param = new HttpParams()
          .set('affiliateid', websiteId.toString())
          .set('zoneid', zoneId.toString());
        this.httpService.get('zonesinclude/', param)
          .then(resp => {
            const linkbanner = this.parseLinkBanner([resp.data])
            resolve(linkbanner[0]);
          })
          .catch(err => {
            reject(err);
          });
      }
    });
  }

  public getLinkedBannerList(websiteId: number, zoneId: number, advertiserId: number, campaignId: number, bannerId: number): Promise<BannerModel[]> {
    return new Promise((resolve, reject) => {
      let param = new HttpParams()
        .set('affiliateid', websiteId.toString())
        .set('zoneid', zoneId.toString())
        .set('clientid', advertiserId.toString())
        .set('campaignid', campaignId.toString())
        .set('bannerid', bannerId.toString());
      this.httpService.get('zonesinclude/', param)
        .then(resp => {
          const linkedbanner = this.parseBanner(resp.data.linkedBanner);
          resolve(linkedbanner);
        })
        .catch(err => {
          reject(err);
        });
    })
  }

  /** parsing zone funtions start */
  private parseZone(zoneResp: any[]) {
    let zone: ZoneModel[] = [];
    if (zoneResp) {
      zone = zoneResp.map(z => {
        let _zone: ZoneModel = new ZoneModel();
        _zone.zoneId = z.zoneid;
        _zone.zoneName = z.zonename;
        _zone.zoneType = z.zonetype;
        _zone.width = z.width;
        _zone.height = z.height;
        _zone.sizeFlag = z.size_flag;
        _zone.description = z.description;
        _zone.delivery = z.delivery;
        _zone.createdDate = z.created_date;
        _zone.affiliateId = z.affiliateid;
        _zone.adSelection = z.ad_selection;
        _zone.comments = z.comments;
        return _zone;
      });
    }
    return zone;
  }
  /** parsing zone funtions end */



  /** deparse zone funtion start */

  private deparseZone(zone: ZoneModel) {
    return {
      zoneid: zone.zoneId,
      zonename: zone.zoneName,
      zonetype: zone.zoneType,
      delivery: zone.delivery,
      height: zone.height,
      width: zone.width,
      comments: zone.comments,
      description: zone.description,
      affiliateid: zone.affiliateId
    }
  }

  /** deparse zone funtion end */



  /** parse invocation code function start */
  private parseInvocation(invocation) {
    let invocationCode: InvocationCodeModel = null;


    if (invocation) {
      invocationCode = invocation.map(i => {
        let _invocation = new InvocationCodeModel();
        _invocation.invocationCode = i.code;
        if (i.thirdpartytrack == null) {
          _invocation.thirdPartyTrack = '';
        } else {
          _invocation.thirdPartyTrack = i.thirdpartytrack;
        }
        _invocation.zoneId = i.zoneid;
        _invocation.zoneType = i.zonetype;
        _invocation.websiteId = i.affiliateid;
        return _invocation;
      });
      return invocationCode;
    }
  }

  /** parse invocation code function start */

  /**  parse linkbanner function start */
  private parseLinkBanner(linkbanner) {
    let LinkBannerList: LinkBannerModel = null;
    if (linkbanner) {
      LinkBannerList = linkbanner.map(lb => {
        let _lb = new LinkBannerModel();
        _lb.advertiserList = this.parseAdvertiser(lb.advtdata);
        _lb.campaignList = this.parsecampaign(lb.cmpdata);
        _lb.avlBannerList = this.parseBanner(lb.bannerdata);
        _lb.linkBannerList = this.parseBanner(lb.linkbannerlist);
        return _lb
      });
    }
    return LinkBannerList
  }

  /**  parse linkbanner function end */


  /** parse advertiser for link banner function start */
  private parseAdvertiser(clients) {
    let advertisers: AdvertiserModel[];
    if (clients && clients.length > 0) {
      advertisers = clients.map((adv => new AdvertiserModel({
        advertiserId: adv.clientid,
        advertiserName: adv.clientname,
      })));
    }
    return advertisers;
  }

  /** parse advertiser for link banner function  end */

  /** parse campain for link banner function start */
  private parsecampaign(campaign) {
    let campaigns: CampaignModel[];
    if (campaign && campaign.length > 0) {
      campaigns = campaign.map((cmp => new CampaignModel({
        campaignId: cmp.campaignid,
        campaignName: cmp.campaignname
      })));
    }
    return campaigns;
  }

  /** parse campain for link banner function  end */


  /** parse  banner for link banner function  start */
  private parseBanner(banner) {
    let bannerList: BannerModel[] = [];
    if (banner && banner.length > 0) {
      bannerList = banner.map((b => new BannerModel({
        bannerId: b.bannerid,
        bannerName: b.description,
        width: b.width,
        height: b.height,
        destinationUrl: b.url,
        updated: b.updated,

      })));
    }
    return bannerList;
  }
  /** parse  banner for link banner function  end */


}
