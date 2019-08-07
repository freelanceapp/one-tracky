import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from 'src/app/modules/branding/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private brandingBaseUrl: string = 'http://139.59.67.0:8000/';

  constructor(private httpClient: HttpClient) { }


  public get loggedInBrandingUser(): UserModel {
    const brandingUserInfo = localStorage.getItem(btoa('loggedInBrandingUser'));
    let localUser: UserModel;
    if (brandingUserInfo) {
      try {
        localUser = JSON.parse(atob(brandingUserInfo)) as UserModel;

        const localBrandingUser: UserModel = new UserModel();
        localBrandingUser.firstName = localUser.firstName;
        localBrandingUser.userId = localUser.userId;
        localBrandingUser.lastName = localUser.lastName;
        localBrandingUser.role = localUser.role;
        return localBrandingUser;
      } catch {
        return null;
      }
    } else {
      return null;
    }
  }

  public set loggedInBrandingUser(user: UserModel) {
    localStorage.setItem(btoa('loggedInBrandingUser'), btoa(JSON.stringify(user)));
  }

  /** Get branding user token */
  public get brandingUserToken(): string {
    const token = localStorage.getItem(btoa('brandingToken'));
    if (token) {
      return atob(token);
    } else {
      return null;
    }
  }

  /** returns true if branding user is loggedin else returns false */
  public get isBrandingUserLoggedIn(): boolean {
    const token = this.brandingUserToken;
    const user = this.loggedInBrandingUser;
    if (token && user) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * Login branding user
   * @param email email of user
   * @param password password of user
   */
  public loginBrandingUser(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.brandingBaseUrl + 'api-token-auth/', {
        username: email, password
      }).subscribe(
        (resp: any) => {
          if (resp && resp.status === true) {
            if (resp.data.token) {
              const brandingUser = new UserModel(
                {
                  firstName: resp.data.firstname,
                  lastName: resp.data.lastname,
                  userId: resp.data.user_id,
                  role: resp.data.role ? resp.data.role : null,
                }
              );
              this.loggedInBrandingUser = brandingUser;
              localStorage.setItem(btoa('brandingToken'), btoa(resp.data.token));
            }
            resolve(resp.status === true);
          } else {
            reject(resp.message);
          }
        },
        err => {
          reject(err.message + '\n' + 'Status : ' + err.status);
        },
        () => {

        }
      );
    });
  }

  /**
   * Logout the branding user
   */
  public logoutBrandingUser(): Promise<boolean> {
    return new Promise((resolve, reject) => {

      const header = new HttpHeaders({
        Authorization: this.brandingUserToken
      });


      this.httpClient.post(this.brandingBaseUrl + 'logout/',
        {},
        {
          headers: header
        }
      ).subscribe(
        (resp: any) => {
          if (resp && resp.status === true) {
            localStorage.clear();
            resolve(true);
          } else {
            reject(resp.message);
          }
        },
        (err: any) => {
          reject(err.message + '\n' + 'Status : ' + err.status);
        },
        () => {

        }
      );
    });
  }

}
