import { Component, OnInit } from '@angular/core';
import { MenuModel, MenuItemModel } from '../../model/menu.model';
import { LoginService } from 'src/app/services/login/login.service';

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
        new MenuModel('Advertiser', 'advertiser', [
          new MenuItemModel('Add new', 'add-new'),
          new MenuItemModel('All advertisers', ''),
        ]),
        new MenuModel('Campaign', 'campaign', [
          new MenuItemModel('Add new', 'add-new/' + this.logInSvc.loggedInBrandingUser.userId.toString()),
          new MenuItemModel('All campaigns', ''),
        ]),
        new MenuModel('Banner', 'banner', [
          new MenuItemModel('Add new', 'add-new'),
          new MenuItemModel('All banners', ''),
        ]),
        new MenuModel('User', 'user', [
          new MenuItemModel('Add new', 'add-new'),
          new MenuItemModel('All Users', ''),
        ]),
        new MenuModel('Zones', 'zone', [
          new MenuItemModel('Add new', 'add-new'),
          new MenuItemModel('All Zones', ''),
        ]),
        new MenuModel('webSite', 'website', [
          new MenuItemModel('Add new', 'add-new'),
          new MenuItemModel('All website', ''),
        ]),
        new MenuModel('notification', 'notification', [
          new MenuItemModel('All notification', ''),
        ]),
      ]
    );
  }

}
