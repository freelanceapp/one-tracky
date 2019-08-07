import { Component, OnInit } from '@angular/core';
import { MenuModel, MenuItemModel } from '../../model/menu.model';

@Component({
  selector: 'app-left-side-panel',
  templateUrl: './left-side-panel.component.html',
  styleUrls: ['./left-side-panel.component.scss']
})
export class LeftSidePanelComponent implements OnInit {

  public brandingMenu: MenuModel[] = [];

  constructor() { }

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
          new MenuItemModel('Add new', 'add-new'),
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
      ]
    );
  }

}
