import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { IHttpResponse } from '../../interfaces/http-resp.interface';
import { PerformanceModule } from '../../performance.module';

export enum HttpMethodType {
  get = 'GET', post = 'POST', delete = 'DELETE', put = 'PUT'
}
export enum HttpDataType {
  RowData, FormData
}


@Injectable({
  providedIn: PerformanceModule
})
export class HttpService {

  private baseUrl: string;

  private corsHeaders: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {

    // this.baseUrl = 'http://aflytica.com/';

  }

  /**
   * Send http get request
   * @param apiPath api controller path (exclusive base path)
   * @param params paremeters to send
   */
  public get(apiPath: string, params?: HttpParams): Promise<IHttpResponse> {
    return new Promise((resolve, reject) => {

      this.http.get("http://aflytica.com/company/listAdvertiser/", { params }).subscribe(
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
  public post(apiPath: string, data?: any): Promise<IHttpResponse> {
    return new Promise((rs, rj) => {
      this.http.post(this.baseUrl + apiPath, data).subscribe(
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
  public put(apiPath: string, data?: any): Promise<IHttpResponse> {
    return new Promise((rs, rj) => {
      this.http.put(this.baseUrl + apiPath, data).subscribe(
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

      this.http.delete(this.baseUrl + apiPath).subscribe(
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
      if (response.status) {
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
        alert(err.error.message);
      }
    } else {
      if (environment.production) {
        console.error(`Error status : ${err.status} , Message : ${err.error}`);
      } else {
        alert(err.error.message);
      }
    }
  }

}
