import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/app/modules/login/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserSignupService {


  private baseUrl: string = 'http://139.59.67.0:8000/';
  constructor(private httpClient: HttpClient) { }

  public adduser(userData: UserModel, role: number): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      const data = this.deparseUser(userData);
      console.log(role)
      if (role === 3) {
        console.log('pub')
        this.httpClient.post(this.baseUrl + 'inventory/publisher/users/', data).subscribe(
          (resp: any) => { },
          (err) => { }
        );
      } else if (role === 2) {
        console.log('adv')
        this.httpClient.post(this.baseUrl + 'inventory/advertiser/users/', data).subscribe(
          (resp: any) => { },
          (err) => { }
        );
      }
    });
  }

  private deparseUser(user: UserModel): any {
    return {
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      password: user.password,
      company: user.companyName,
      skype: user.skypeId,
      phone: user.phoneNo,
      role: user.role
    };
  }
}
