import { BannerTypeEnum } from '../enums/banner-type.enum';

export class BannerModel {
    public bannerId: number = null;
    public campaignId: number = null;
    public bannerName: string = '';
    public bannerType: BannerTypeEnum = BannerTypeEnum.Web;
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

    public videoDelType: string = '';
    public impressionPixel: string = '';
    public startPixel: string = '';
    public quaterPixel: string = '';
    public midPixel: string = '';
    public thirdQuaterPixel: string = '';
    public endPixel: string = '';
    public clickPixel: string = '';
    public videoType: string = '';
    public mute: boolean = false;
    public bitrate: number = null;
    public videoDeliveryMethod: string = '';
    public videoDuration: number = null;
    public skip: boolean = false;
    public skipTime: number = null;
    public code: string = '';
    public invocationTag: string = '';

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

