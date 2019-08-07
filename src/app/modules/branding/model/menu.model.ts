
/**
 * Branding left side menu
 */
export class MenuModel {

    constructor(
        public text: string,
        public modulePath: string,
        public menuItems: MenuItemModel[]
    ) {

    }
}

/**
 * Branding left side submenu item
 */
export class MenuItemModel {
    constructor(
        public text: string,
        public componentPath: string,
    ) {

    }
}

