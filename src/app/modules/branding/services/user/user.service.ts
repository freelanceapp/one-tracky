import { Injectable } from '@angular/core';
import { UserModel } from '../../model/user.model';
import { BrandingModule } from '../../branding.module';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: BrandingModule
})
export class UserService {


  private baseUrl: string = 'users/';

  constructor(private httpSvc: HttpService) { }

  getUsers(): Promise<UserModel[]>;
  getUsers(userId: number): Promise<UserModel>;
  getUsers(userId?: number): Promise<UserModel[] | UserModel> {
    return new Promise((resolve, reject) => {

      let url: string = this.baseUrl;

      const isSingleUser = typeof userId === 'number';
      if (isSingleUser) {
        url += (userId + '/');
      }

      this.httpSvc.get(url).then(resp => {
        if (resp.status === true) {
          if (isSingleUser) {
            const user = this.parseUser([resp.data]);
            resolve(user[0]);
          } else {
            const users = this.parseUser(isSingleUser ? [resp.data] : resp.data);
            resolve(users);
          }
        } else {
          reject(resp.message);
        }
      }).catch(err => reject(err));

    });
  }

  public addNewUser(user: UserModel): Promise<string> {
    return new Promise((resolve, reject) => {
      const usr = this.deParseUser(user);
      this.httpSvc.post(this.baseUrl, usr).then(resp => {
        if (resp.status === true) {
          resolve(resp.message);
        } else {
          reject(resp.message);
        }
      }).catch(err => reject(err));
    });
  }

  public editUser(user: UserModel): Promise<string> {
    return new Promise((resolve, reject) => {
      const usr = this.deParseUser(user);
      delete usr.password;
      this.httpSvc.put(this.baseUrl + user.userId + '/', usr).then(resp => {
        if (resp.status === true) {
          resolve(resp.message);
        } else {
          reject(resp.message);
        }
      }).catch(err => reject(err));
    });
  }

  public deleteUser(Ids: number[]): Promise<string> {
    return new Promise((resolve, reject) => {
      const data = {
        ids: Ids
      };
      const dataToSend = JSON.stringify(data);

      this.httpSvc.post(this.baseUrl + 'usersdelete/', dataToSend).then(resp => {
        if (resp.status === true) {
          resolve(resp.message);
        } else {
          reject(resp.message);
        }
      }).catch(err => reject(err));
    });
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
      user_id: user.userId,
      firstname: user.firstName,
      lastname: user.lastName,
      username: user.userName,
      password: user.password,
      company: user.company,
      phone: user.phone,
      role: user.role,
      skype: user.skype,
    };
  }

}
