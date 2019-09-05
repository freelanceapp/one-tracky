import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { IHttpResponse } from '../../interface/http-resp.interface';
import { BrandingModule } from '../../branding.module';

import { LoginService } from 'src/app/services/login/login.service';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from 'src/app/modules/shared/components/error-dialog/error-dialog.component';
import { UserRole } from '../../enums/user-role.enum';

export enum HttpMethodType {
  get = 'GET', post = 'POST', delete = 'DELETE', put = 'PUT'
}
export enum HttpDataType {
  RowData, FormData
}


@Injectable({
  providedIn: 'root'
})

/** http service for branding module */
export class HttpService {

  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private loginSvc: LoginService,
    private dialog: MatDialog
  ) {
    this.setBaseURL();
  }


  public setBaseURL() {
    const user = this.loginSvc.loggedInBrandingUser;
    if (user.role === UserRole.Admin) {
      this.baseUrl = 'http://139.59.67.0:8000/inventory/';
    } else if (user.role === UserRole.Advertiser) {
      this.baseUrl = 'http://139.59.67.0:8000/inventory/advertiser/';
    } else if (user.role === UserRole.Publisher) {
      this.baseUrl = 'http://139.59.67.0:8000/inventory/publisher/';
    }
  }

  /**
   * Send http get request
   * @param apiPath api controller path (exclusive base path)
   * @param params paremeters to send
   */
  public get(apiPath: string, params?: HttpParams): Promise<IHttpResponse> {
    return new Promise((resolve, reject) => {
      this.setBaseURL();

      this.http.get(this.baseUrl + apiPath, { params, headers: this.authHeaders }).subscribe(
        (resp: any) => {
          this.handleResponse(resp).then(data => resolve(data)).catch(err => reject(err));
        },
        err => {
          this.handleError(err);
          reject('Something went wrong');
        },
        () => {
        }
      );
    });
  }

  /**
   * Send http post request
   * @param apiPath api controller path (exclusive base path)
   * @param data data to send
   */
  public post(apiPath: string, data?: any, params?: HttpParams): Promise<IHttpResponse> {
    return new Promise((rs, rj) => {
      this.setBaseURL();
      this.http.post(this.baseUrl + apiPath, data, {
        params,
        headers: this.authHeaders
      }).subscribe(
        resp => {
          this.handleResponse(resp).then(respon => rs(respon)).catch(err => rj(err));
        },
        err => {
          this.handleError(err);
          rj(err);
        }
      );
    });
  }

  /**
   * Send http put request
   * @param apiPath api controller path (exclusive base path)
   * @param data data to send
   */
  public put(apiPath: string, data?: any, params?: HttpParams): Promise<IHttpResponse> {
    return new Promise((rs, rj) => {
      this.setBaseURL();

      this.http.put(this.baseUrl + apiPath, data, {
        params,
        headers: this.authHeaders
      }).subscribe(
        resp => this.handleResponse(resp).then(respNew => {
          rs(respNew);
        }).catch(err => rj(err)),
        err => {
          this.handleError(err);
        }
      );
    });
  }

  /**
   * Send http delete request
   * @param apiPath api controller path (exclusive base path)
   */
  public delete(apiPath: string, data?: any): Promise<IHttpResponse> {
    return new Promise((rs, rj) => {
      this.setBaseURL();

      this.http.delete(this.baseUrl + apiPath, {
        headers: this.authHeaders
      }).subscribe(
        resp => {
          this.handleResponse(resp).then(r => rs(r)).catch(err => rj(err));
        },
        err => {
          this.handleError(err);
          rj(err);
        }
      );
    });
  }

  private handleResponse(response: any): Promise<IHttpResponse> {

    return new Promise((res, rej) => {
      const resp: IHttpResponse = {
        data: response.data,
        message: response.message,
        status: response.status === true
      };
      if (resp.status) {
        res(resp);
      } else {
        rej(resp.message);
      }
    });

  }

  private async handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      if (environment.production) {
        console.error(err.error.message);
      } else {
        this.openErrorDialog('Development error', err.error.message);
      }
    } else {
      if (environment.production) {
        const errMsg: string = `Error status : ${err.status} , Message : ${err.error}`;
        console.error(errMsg);
      } else {
        this.openErrorDialog(`Error status : ${err.status}`, err.error);
      }
    }
  }

  /**
   * Show error dialog in full detail in develpment envirement only
   * @param title Error title
   * @param message Error message
   */
  private openErrorDialog(title: string, message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: { title, message }
    });
  }

  /** Get custom http headers containing token  */
  private get authHeaders(): HttpHeaders {
    const header = new HttpHeaders({
      Authorization: this.loginSvc.brandingUserToken
    });
    return header;
  }


}
