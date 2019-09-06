import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private brandingBaseUrl: string = 'http://139.59.67.0:8000/';
  constructor(private httpClient: HttpClient) { }


  public resetPassword(email: string, role: number): Promise<Boolean> {
    return new Promise((resolve, reject) => {

      const rpdata = {
        "email_id": email,
        "user_role": role
      };
      const resetPwsData = JSON.stringify(rpdata);

      this.httpClient.put(this.brandingBaseUrl + 'inventory/users/forgotpassword/', resetPwsData).subscribe(
        (resp: any) => {
          if (resp && resp.status === true) {
            resolve(true);
          }
          else {
            resolve(false);
          }
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }
}
