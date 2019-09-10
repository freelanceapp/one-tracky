import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/app/modules/login/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserSignupService {


  private baseUrl: string = 'http://139.59.67.0:8000/';
  constructor(private httpClient: HttpClient) { }

  public adduser(userData: UserModel, role: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const data = this.deparseUser(userData);
      if (userData) {
        this.httpClient.post(this.baseUrl + 'inventory/users/', data).subscribe(
          (resp: any) => {
            resolve(resp.message);
          },
          (err) => {
            reject(err.message);
          }
        );
      }
    });
  }

  private parseUser(user) {
    let users: UserModel = null;
    if (user) {
      users = user.map(u => {
        let _user = new UserModel()
        _user.companyName = u.company;
        _user.email = u.username;
        _user.firstName = u.firstname;
        _user.lastName = u.lastname;
        _user.skypeId = u.skype;
        _user.phoneNo = u.phone;
        _user.role = u.user_type;
        return _user;
      });
      return users;
    }
  }


  private deparseUser(user: UserModel): any {
    return {
      firstname: user.firstName,
      lastname: user.lastName,
      username: user.email,
      password: user.password,
      company: user.companyName,
      skype: user.skypeId,
      phone: user.phoneNo,
      user_type: user.userType
    };
  }

}
