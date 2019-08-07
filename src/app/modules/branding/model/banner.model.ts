export class BannerModel {
    public bannerId: number = null;
    public bannerName: string = '';
    public bannerType: string = '';
    public bannerImage: string = '';
    public destinationUrl: string = '';
    public target: string = '';
    public trackingPixel: string = '';
    public allText: string = '';
    public statusText: string = '';
    public textBelowImage: string = '';
    public keyword: string = '';
    public weight: number = null;
    public comments: string = '';

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

