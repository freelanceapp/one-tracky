import { Injectable } from '@angular/core';
import { ZoneModel } from '../../model/zone.model';
import { BrandingModule } from '../../branding.module';
import { HttpService } from '../http/http.service';


@Injectable({
  providedIn: BrandingModule
})
export class ZoneService {
  private baseUrl: string = 'zones/';
  constructor(private httpService: HttpService) { }


  /**
   * get all zone and zone BY ID
   * @param zoneId ID of zone
   * 
   */
  public getZone(): Promise<ZoneModel[]>;
  public getZone(zoneId: number): Promise<ZoneModel>;
  public getZone(zoneId?: number): Promise<ZoneModel | ZoneModel[]> {
    return new Promise((resolve, reject) => {
      if (zoneId) {
        this.httpService.get(this.baseUrl + zoneId)
          .then(resp => {
            let zone = this.parseZone([resp.data]);
            resolve(zone[0]);
          })
          .catch(err => {
            reject(err);
          })
      }
      else {
        this.httpService.get(this.baseUrl)
          .then(resp => {
            let zones = this.parseZone(resp.data);
            resolve(zones);
          })
          .catch(err => {
            reject(err);
          })
      }
    })
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
          let zone = this.parseZone([resp.data]);
          resolve(zone[0])
        })
        .catch(err => {
          reject(err);
        })
    })
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

        })
    })

  }


  /***
   * edit zone with id 
   * @param zoneId id of zone
   * @param data json of data for update 
   * 
   */
  public editZone(zoneId: number, data: ZoneModel): Promise<ZoneModel> {
    return new Promise((resolve, reject) => {
      let sendData = this.deparseZone(data);
      this.httpService.put(this.baseUrl + zoneId + '/', JSON.stringify(sendData))
        .then(resp => {
          let zone = this.parseZone([resp.data]);
          resolve(zone[0]);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  /**parsing zone funtions start */
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
      })
    }
    return zone
  }
  /**parsing zone funtions end */



  /**deparse zone funtion start */

  private deparseZone(zone: ZoneModel) {
    return {
      zoneid: zone.zoneId,
      zonename: zone.zoneName,
      zonetype: zone.zoneType,
      delivery: zone.delivery,
      height: zone.height,
      width: zone.width,
      comments: zone.comments,
      description: zone.description
    }
  }

  /**deparse zone funtion end */

}