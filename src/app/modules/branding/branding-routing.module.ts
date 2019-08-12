import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonComponent } from './components/common/common.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'advertiser',
        loadChildren: './modules/advertiser/advertiser.module#AdvertiserModule'
      },
      {
        path: 'campaign',
        loadChildren: './modules/campaign/campaign.module#CampaignModule'
      },
      {
        path: 'banner',
        loadChildren: './modules/banner/banner.module#BannerModule'
      },
      {
        path: 'user',
        loadChildren: './modules/users/users.module#UsersModule'
      },
      {
        path: 'zone',
        loadChildren: './modules/zone/zone.module#ZoneModule'
      },
      {
        path: 'website',
        loadChildren: './modules/website/website.module#WebsiteModule'
      },
      {
        path: 'notification',
        loadChildren: './modules/notification/notification.module#NotificationModule'
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandingRoutingModule { }
