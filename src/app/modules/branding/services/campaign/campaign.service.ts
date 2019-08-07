import { Injectable } from '@angular/core';
import { CampaignModel } from '../../model/campaign.model';
import { BrandingModule } from '../../branding.module';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: BrandingModule
})
export class CampaignService {

  private baseUrl: string = 'campaigns/';

  constructor(private httpSvc: HttpService) { }

  public getCampaigns(): Promise<CampaignModel[]> {
    return new Promise((resolve, reject) => {
      this.httpSvc.get(this.baseUrl).then(resp => {
        if (resp.status === true) {

        }
      }).catch(err => reject(err));
    });
  }

}
