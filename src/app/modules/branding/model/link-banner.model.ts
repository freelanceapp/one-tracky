import { AdvertiserModel } from './advertiser.model';
import { CampaignModel } from './campaign.model';
import { BannerModel } from './banner.model';

export class LinkBannerModel {
    public advertiserList: AdvertiserModel[] = null;
    public campaignList: CampaignModel[] = null;
    public avlBannerList: BannerModel[] = null;
    public linkBannerList: BannerModel[] = null;
}
