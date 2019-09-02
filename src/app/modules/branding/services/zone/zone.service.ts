import { Injectable } from '@angular/core';
import { ZoneModel } from '../../model/zone.model';
import { BrandingModule } from '../../branding.module';
import { HttpService } from '../http/http.service';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { InvocationCodeModel } from '../../model/invocation-code.model';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: BrandingModule
})
export class ZoneService {
  private baseUrl: string = 'zones/';
  constructor(private httpService: HttpService) {
    this.getZonesbyWebsiteId(20)
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
   * @param zoneId id of zone 
   */
  public deleteZone(zoneId): Promise<string> {
    return new Promise((resolve, reject) => {
      this.httpService.delete(this.baseUrl + zoneId)
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
      console.log(zoneType)
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
        _invocation.thirdPartyTrack = i.thirdpartytrack;
        _invocation.zoneId = i.zoneid;
        _invocation.zoneType = i.zonetype;
        _invocation.websiteId = i.affiliateid;
        return _invocation;
      });
      return invocationCode;
    }
  }

  /** parse invocation code function start */

}
