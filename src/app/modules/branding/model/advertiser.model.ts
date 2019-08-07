export class AdvertiserModel {
    public advertiserId: number = null;
    public userId: number = null;
    public advertiserName: string = '';
    public phoneNo: string = '';
    public email: string = '';

    /** Email when a campaign is automatically activated/deactivated */
    public reportDeactivate: boolean = false;

    /** Email campaign delivery reports */
    public report: boolean = false;

    /** Number of days between campaign delivery reports */
    public reportInterval: number = 0;
    public comments: string = '';

    constructor();
    constructor(advertiserProperties: Partial<AdvertiserModel>)
    constructor(args?: Partial<AdvertiserModel>) {
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
