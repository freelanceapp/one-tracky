import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { BrandingModule } from '../../branding.module';
import { WebsiteModel } from '../../model/website.model';
import { UserModel } from '../../model/user.model';


@Injectable({
  providedIn: BrandingModule
})
export class WebsiteService {

  constructor(private httpService: HttpService) {
  }

  public baseUrl: string = 'affiliates/';



  /**
   *get all website
   */

  public getWebsite(): Promise<WebsiteModel[]>;
  /**
   * get website from affilite id
   * @param affiliateId id of affiliate
   */
  public getWebsite(affiliateId: number): Promise<WebsiteModel>;
  public getWebsite(affiliateId?: number): Promise<WebsiteModel | WebsiteModel[]> {
    return new Promise((resolve, reject) => {
      if (affiliateId) {
        this.httpService.get(this.baseUrl + affiliateId)
          .then(resp => {
            let website = this.parseWebsite([resp.data])
            resolve(website[0]);
          })
          .catch(err => {
            reject(err)
          })

      }
      else {
        this.httpService.get(this.baseUrl)
          .then(resp => {
            let website = this.parseWebsite(resp.data);
            resolve(website);
          })
          .catch(err => {
            reject(err)
          })
      }
    })
  }


  /**
   * add website 
   * @param data data for save
   */


  public addWebsite(data: WebsiteModel): Promise<WebsiteModel> {
    return new Promise((resolve, reject) => {
      let dataToSend = this.deparseWebsite(data);
      this.httpService.post(this.baseUrl, JSON.stringify(dataToSend))
        .then(resp => {
          let website = this.parseWebsite([resp.data]);
          resolve(website[0]);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  /**
   * edit website 
   * @param affiliateId  id of affiliate
   * @param data data for edit
   */
  public editWebsite(affiliateId: number, data: WebsiteModel): Promise<WebsiteModel> {
    return new Promise((resolve, reject) => {
      let dataToSend = this.deparseWebsite(data)
      this.httpService.put(this.baseUrl + affiliateId + "/", JSON.stringify(dataToSend))
        .then(resp => {
          let website = this.parseWebsite([resp.data]);
          resolve(website[0]);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  /**
   * delete website by id 
   * @param affiliateId id of affiliate
   */

  public deleteWebsite(Ids: number[]): Promise<string> {
    return new Promise((resolve, reject) => {
      const data = {
        ids: Ids
      };
      const dataToSend = JSON.stringify(data);
      this.httpService.post(this.baseUrl + 'affiliatesdelete/', dataToSend)
        .then(resp => {
          resolve(resp.message);
        })
        .catch(err => {
          reject(err);
        });
    });
  }


  /**
   * add publisher user as admin or executives
   * @param websiteId affiliate id
   * @param data user data
   */
  public addPublisherUser(websiteId: number, data): Promise<string> {
    return new Promise((resolve, reject) => {
      this.httpService.post('executive/users/' + websiteId, data)
        .then(resp => {
          resolve(resp.message);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  private parseWebsite(website) {
    let websiteList: WebsiteModel[] = [];
    if (website) {
      websiteList = website.map(w => {
        let _website: WebsiteModel = new WebsiteModel();
        _website.agencyId = w.agencyid;
        _website.affiliateId = w.affiliateid;
        _website.comments = w.comments;
        _website.contact = w.contact;
        _website.domainName = w.name;
        _website.email = w.email;
        _website.userId = w.userid;
        _website.websiteURL = w.website;
        _website.updated = w.updated
        return _website;
      })
    }
    return websiteList
  }


  private deparseWebsite(website: WebsiteModel) {
    return {
      affiliateid: website.affiliateId,
      comments: website.comments,
      contact: website.contact,
      name: website.domainName,
      email: website.email,
      userid: website.userId,
      website: website.websiteURL,
    }
  }




}