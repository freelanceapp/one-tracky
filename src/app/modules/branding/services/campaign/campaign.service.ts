import { Injectable } from '@angular/core';
import { CampaignModel } from '../../model/campaign.model';
import { BrandingModule } from '../../branding.module';
import { HttpService } from '../http/http.service';
import { CampaignPeriodType } from '../../enums/campaign-period-type.enum';
import { CampaignTargetType } from '../../enums/target-type.enum';

@Injectable({
  providedIn: BrandingModule
})
export class CampaignService {

  private baseUrl: string = 'campaigns/';

  constructor(private httpSvc: HttpService) { }

  /**
   * Get all campaigns
   */
  public getCampaigns(): Promise<CampaignModel[]>;
  /**
   * Get campaign by id
   * @param campaignId Campaign id
   */
  public getCampaigns(campaignId: number): Promise<CampaignModel>;
  public getCampaigns(campaignId?: number): Promise<CampaignModel[] | CampaignModel> {
    return new Promise((resolve, reject) => {
      const isOneCampaign = typeof campaignId === 'number';
      const url = isOneCampaign ? (this.baseUrl + campaignId + '/') : this.baseUrl;
      this.httpSvc.get(url).then(resp => {
        if (resp.status === true) {
          const campaigns = this.parseCampaign(resp.data);
          resolve(isOneCampaign ? campaigns[0] : campaigns);
        } else {
          reject(resp.message);
        }
      }).catch(err => reject(err));
    });
  }

  public addCampaign(campaign: CampaignModel) {
    return new Promise((resolve, reject) => {
      this.httpSvc.post(this.baseUrl, this.deParseCampaign(campaign)).then(resp => {
        resolve(resp.message);
      }).catch(err => {
        reject(err);
      });
    });
  }


  public editCampaign(campaign: CampaignModel): Promise<string> {
    return new Promise((resolve, reject) => {
      this.httpSvc.put(this.baseUrl + campaign.campaignId + '/', this.deParseCampaign(campaign))
        .then(resp => {
          if (resp.status === true) {
            resolve(resp.message);
          } else {
            reject(resp.message);
          }
        })
        .catch(err => reject(err));
    });
  }

  public deleteCampaign(campaignId: number): Promise<string> {
    return new Promise((res, rej) => {
      this.httpSvc.delete(this.baseUrl + campaignId + '/')
        .then(resp => {
          if (resp.status === true) {
            res(resp.message);
          } else {
            rej(resp.message);
          }
        })
        .catch(err => {
          rej(err);
        });
    });
  }
  private parseCampaign(data: any): CampaignModel[] {
    try {
      const isArray = Array.isArray(data);
      if (!isArray) {
        data = [data];
      }
      const campArr: CampaignModel[] = data.map(d => new CampaignModel(
        {
          campaignId: d.campaignid,
          advertiserId: d.clientid,
          campaignName: d.campaignname,

          startDate: new Date(d.activate_time),
          endDate: d.expire_time ? new Date(d.expire_time) : null,

          pricingModel: d.revenue_type,
          rate: d.revenue,
          impressions: d.views !== -1 ? d.views : null,
          views: d.views === -1,

          priority: d.priority,
          targetType: this.getTargetData(d).targetType,
          targetValue: this.getTargetData(d).targetValue,

          cappingPeriod: d.capping_period_value,
          cappingPeriodType: d.capping_period_type,
          cappingAmount: d.capping_amount,

          comments: d.comments,

          status: d.status === 1

        }));

      return campArr;
    } catch {
      return null;
    }
  }


  private getTargetData(campaign: any): { targetType: CampaignTargetType, targetValue: number } {
    const obj = {
      targetType: null,
      targetValue: null
    };

    if (campaign.target_click !== null) {
      obj.targetType = CampaignTargetType.Clicks;
      obj.targetValue = campaign.target_click;
    } else if (campaign.target_conversion !== null) {
      obj.targetType = CampaignTargetType.Conversions;
      obj.targetValue = campaign.target_conversion;
    } else if (campaign.target_impression !== null) {
      obj.targetType = CampaignTargetType.Impression;
      obj.targetValue = campaign.target_impression;
    }

    return obj;
  }

  private deParseCampaign(campaign: CampaignModel): any {
    if (campaign) {
      const obj: any = {
        // campaignid: campaign.campaignId,
        clientid: campaign.advertiserId,
        campaignname: campaign.campaignName,
        activate_time: campaign.startDate,
        expire_time: campaign.endDate,
        revenue_type: parseInt(campaign.pricingModel.toString(), 10),
        revenue: campaign.rate,
        priority: campaign.priority,
        // target_type: campaign.targetType,
        // target_value: campaign.targetValue,
        capping_period_value: campaign.cappingPeriod,
        capping_period_type: campaign.cappingPeriodType,
        capping_amount: campaign.cappingAmount,
        comments: campaign.comments,
        status: campaign.status ? 1 : 0,
        views: campaign.views ? -1 : campaign.impressions
      };

      if (campaign.targetType) {
        obj[campaign.targetType] = campaign.targetValue;
      }

      return obj;
    }
  }

}
