import { BannerTypeEnum } from '../enums/banner-type.enum';

export class BannerModel {
    public bannerId: number = null;
    public campaignId: number = null;
    public bannerName: string = '';
    public bannerType: BannerTypeEnum = BannerTypeEnum.Standard;
    public bannerImage: File | string = null;
    public width: number = null;
    public height: number = null;
    public trackingPixel: string = '';
    public comments: string = '';
    public keyword: string = '';
    public destinationUrl: string = '';
    public weight: number = null;
    public fileName: string = '';
    public updated: Date = null;


    constructor();
    constructor(advertiserProperties: Partial<BannerModel>)
    constructor(args?: Partial<BannerModel>) {
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

