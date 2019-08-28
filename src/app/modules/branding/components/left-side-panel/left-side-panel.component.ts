import { Component, OnInit } from '@angular/core';
import { MenuModel, MenuItemModel } from '../../model/menu.model';
import { LoginService } from 'src/app/services/login/login.service';
import { UserModel } from '../../model/user.model';
import { UserRole } from '../../enums/user-role.enum';

@Component({
  selector: 'app-left-side-panel',
  templateUrl: './left-side-panel.component.html',
  styleUrls: ['./left-side-panel.component.scss']
})
export class LeftSidePanelComponent implements OnInit {

  public brandingMenu: MenuModel[] = [];
  constructor(private logInSvc: LoginService) { }

  ngOnInit() {
    this.createMenu();
  }

  private createMenu() {
    this.brandingMenu.push(
      ...[
        new MenuModel('Dashboard', 'dashboard',
          [new MenuItemModel('Home', 'component-one')]),
      ]
    );

    const usr = this.logInSvc.loggedInBrandingUser;

    if (usr.role === UserRole.Admin) {

      this.brandingMenu.push(...
        [new MenuModel('Advertiser', 'advertiser', [
          new MenuItemModel('Add new', 'add-new'),
          new MenuItemModel('All advertisers', ''),
        ]),
        new MenuModel('Campaign', 'campaign', [
          new MenuItemModel('Add new', 'add-new/' + this.logInSvc.loggedInBrandingUser.userId.toString()),
          new MenuItemModel('All campaigns', ''),
        ]),
        new MenuModel('Banner', 'banner', [
          new MenuItemModel('Add new', 'add-new/' + '1'),
          new MenuItemModel('All banners', ''),
        ]),
        new MenuModel('User', 'user', [
          new MenuItemModel('Add new', 'add-new'),
          new MenuItemModel('All Users', ''),
        ]),
        new MenuModel('Zones', 'zone', [
          // new MenuItemModel('Add new', 'add-new'),
          new MenuItemModel('All Zones', ''),
        ]),
        new MenuModel('Website', 'website', [
          new MenuItemModel('Add new', 'add-new'),
          new MenuItemModel('All website', ''),
        ]),
        ]
      );

    } else if (usr.role === UserRole.Advertiser) {

      this.brandingMenu.push(...
        [new MenuModel('Advertiser', 'advertiser', [
          new MenuItemModel('Add new', 'add-new'),
          new MenuItemModel('All advertisers', ''),
        ]),
        new MenuModel('Campaign', 'campaign', [
          new MenuItemModel('Add new', 'add-new/' + this.logInSvc.loggedInBrandingUser.userId.toString()),
          new MenuItemModel('All campaigns', ''),
        ]),
        new MenuModel('Banner', 'banner', [
          new MenuItemModel('Add new', 'add-new/' + '1'),
          new MenuItemModel('All banners', ''),
        ])]
      );

    } else if (usr.role === UserRole.Publisher) {
      this.brandingMenu.push(...
        [new MenuModel('Zones', 'zone', [
          // new MenuItemModel('Add new', 'add-new'),
          new MenuItemModel('All Zones', ''),
        ]),
        new MenuModel('Website', 'website', [
          new MenuItemModel('Add new', 'add-new'),
          new MenuItemModel('All website', ''),
        ])]
      );
    }
    this.brandingMenu.push(...[
      new MenuModel('notification', 'notification', [
        new MenuItemModel('All notification', ''),
      ])
    ]);
  }
}
