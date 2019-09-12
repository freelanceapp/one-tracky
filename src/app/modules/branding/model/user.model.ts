import { UserRole } from '../enums/user-role.enum';

/**
 * Branding user model
 */
export class UserModel {

    public userId: number = null;
    public firstName: string = '';
    public lastName: string = '';
    public userName: string = '';
    public password: string = '';
    public company: string = '';
    public phone: string = '';
    public role: UserRole = null;
    public skype: string = null;
    public dateCreated: Date = null;
    public userType: number = null;
    constructor();
    constructor(userProperties: Partial<UserModel>);
    constructor(args?: any) {
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

