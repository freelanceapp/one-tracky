import { CampaignRevenueType } from '../enums/revenue-type.enum';
import { CampaignTargetType } from '../enums/target-type.enum';
import { CampaignPeriodType } from '../enums/campaign-period-type.enum';

export class CampaignModel {
    public campaignId: number = null;
    public campaignName: string = '';
    public revenueType: CampaignRevenueType = CampaignRevenueType.CPM;
    public revenue: number = null;
    public impressions: number = null;
    public views: boolean = false;
    public highPriorityValue: number = 0;
    public targetType: CampaignTargetType = CampaignTargetType.Impression;
    public targetValue: number = 0;
    public cappingPeriodValue: number = null;
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

