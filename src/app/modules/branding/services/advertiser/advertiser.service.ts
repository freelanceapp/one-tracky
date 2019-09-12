import { Injectable } from '@angular/core';
import { AdvertiserModel } from '../../model/advertiser.model';
import { BrandingModule } from '../../branding.module';
import { HttpService } from '../http/http.service';
import { UserModel } from '../../model/user.model';

@Injectable({
  providedIn: BrandingModule
})
export class AdvertiserService {

  private baseUrl: string = 'clients/';

  constructor(private httpSvc: HttpService) { }

  /**
   * Get all advertisers
   */
  public getAdvertisers(): Promise<AdvertiserModel[]>;
  /**
   * Get advertiser by id
   * @param advertiserId Advertiser id
   */
  public getAdvertisers(advertiserId: number): Promise<AdvertiserModel>;
  public getAdvertisers(args?: number): Promise<AdvertiserModel[] | AdvertiserModel> {
    return new Promise((resolve, reject) => {

      let url = this.baseUrl;
      const isSingleAdv = typeof args === 'number';
      if (isSingleAdv) {
        url = this.baseUrl + args.toString() + '/';
      }

      this.httpSvc.get(url).then(resp => {
        if (isSingleAdv) {
          const advs: AdvertiserModel[] = this.parseToAdvertiser([resp.data]);
          resolve(advs[0]);
        } else {
          const advs: AdvertiserModel[] = this.parseToAdvertiser(resp.data);
          resolve(advs);
        }
      }).catch(err => reject(err));
    });
  }

  /**
   * Update existing advertiser
   * @param advertiser Advertiser want to update
   */
  public updateAdvertisers(advertiser: AdvertiserModel): Promise<string> {
    return new Promise((resolve, reject) => {
      const client = this.parseToClients(advertiser);
      this.httpSvc.put(this.baseUrl + advertiser.advertiserId + '/', JSON.stringify(client)).then(resp => {
        if (resp.status) {
          // resolve(this.parseToAdvertiser(adv.data)[0]);
          resolve(resp.message);
        } else {
          reject(resp.message);
        }
      }).catch(err => reject(err));
    });
  }


  /**
   * Add new advertiser
   * @param advertiser new advertiser to add
   */
  public addAdvertiser(advertiser: AdvertiserModel): Promise<string> {
    return new Promise((resolve, reject) => {
      this.httpSvc.post(this.baseUrl, this.parseToClients(advertiser)).then(
        resp => {
          if (resp.status) {
            // const newAdv = this.parseToAdvertiser([resp.data]);
            // resolve(newAdv[0]);
            resolve(resp.message);
          } else {
            reject(resp.message);
          }
        }
      ).catch(err => reject(err));
    });
  }


  /**
   * Delete an advertiser
   * @param Ids Advertiser id
   */
  public deleteAdvertiser(Ids: number[]): Promise<string> {
    return new Promise((resolve, reject) => {
      const data = {
        ids: Ids
      };
      const dataToSend = JSON.stringify(data);

      this.httpSvc.post(this.baseUrl + 'clientsdelete/', dataToSend).then(resp => {
        if (resp.status) {
          resolve(resp.message);
        } else {
          reject(resp.message);
        }
      }).catch(err => reject(err));
    });
  }





  /**
   * add advertiser user as admin or executives
   * @param advertiserId affiliate id
   * @param data user data
   */
  public addPublisherUser(advertiserId: number, data): Promise<string> {
    return new Promise((resolve, reject) => {
      const dataToSend = this.deParseUser(data);
      this.httpSvc.post('executive/users/' + advertiserId + '/', dataToSend)
        .then(resp => {
          resolve(resp.message);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * get all users
   * @param advertiserId affiliate id 
   */
  public getAllUsers(advertiserId): Promise<UserModel[]> {
    return new Promise((resolve, reject) => {
      this.httpSvc.get('executive/users/' + advertiserId)
        .then(res => {
          const user = this.parseUser(res.data);
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    });
  }






  /**
   * Parse clients to Advertisers
   * @param clients Clients array
   */
  private parseToAdvertiser(clients: any[]): AdvertiserModel[] {
    let advertisers: AdvertiserModel[];
    if (clients && clients.length > 0) {
      advertisers = clients.map((adv => new AdvertiserModel({
        advertiserId: adv.clientid,
        userId: adv.userid,
        advertiserName: adv.clientname,
        phoneNo: adv.contact,
        email: adv.email,
        comments: adv.comments,
        reportInterval: adv.reportinterval,
        reportDeactivate: adv.reportdeactivate === 't',
        report: adv.report === 't'
      })));
    }
    return advertisers;
  }

  /**
   * Parse advertiser to client
   * @param adv Advertiser
   */
  private parseToClients(adv: AdvertiserModel) {
    return {
      clientid: adv.advertiserId,
      userid: adv.userId,
      clientname: adv.advertiserName,
      contact: adv.phoneNo,
      email: adv.email,
      comments: adv.comments,
      reportinterval: adv.reportInterval,
      reportdeactivate: adv.reportDeactivate ? 't' : 'f',
      report: adv.report ? 't' : 'f'
    };
  }

  private parseUser(userArr: any[]): UserModel[] {
    let users: UserModel[] = [];

    if (Array.isArray(userArr) && userArr.length > 0) {
      users = userArr.map(u => new UserModel({
        userId: u.user_id,
        firstName: u.firstname,
        lastName: u.lastname,
        userName: u.username,
        password: u.password,
        company: u.company,
        phone: u.phone,
        role: parseInt(u.role, 10),
        skype: u.skype,
        dateCreated: new Date(u.date_created)
      }));
    }
    return users;
  }

  private deParseUser(user: UserModel): any {
    return {
      firstname: user.firstName,
      lastname: user.lastName,
      username: user.userName,
      password: user.password,
      phone: user.phone,
      role: user.role,
      user_type: user.userType
    };
  }


}
