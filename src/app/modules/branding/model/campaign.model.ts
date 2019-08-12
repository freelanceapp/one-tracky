import { PricingModelType } from '../enums/pricing-model-type.enum';
import { CampaignTargetType } from '../enums/target-type.enum';
import { CampaignPeriodType } from '../enums/campaign-period-type.enum';

export class CampaignModel {
    public campaignId: number = null;
    public advertiserId: number = null;
    public campaignName: string = '';

    /** Campaign start date */
    public startDate: Date | string = null;
    /** Campaign end date */
    public endDate: Date | string = null;

    public pricingModel: PricingModelType = PricingModelType.CPM;
    public rate: number = null;
    public views: boolean = false;
    public impressions: number = null;

    public priority: number = null;
    public targetType: CampaignTargetType = CampaignTargetType.Impression;
    public targetValue: number = 0;

    public cappingPeriod: number = null;
    public cappingAmount: number = null;
    public cappingPeriodType: CampaignPeriodType = CampaignPeriodType.Days;

    public comments: string = '';

    public status: boolean = false;

    constructor();
    constructor(campaignProperties: Partial<CampaignModel>);
    constructor(args?: Partial<CampaignModel>) {
        if (args) {
            const keys = Object.keys(args);
            if (keys && keys.length > 0) {
                keys.forEach(key => {
                    if (this[key] !== undefined && args[key]) {
                        this[key] = args[key];
                    }
                });
            }
        }
    }

}

