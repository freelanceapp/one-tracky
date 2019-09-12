import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewAdvertiserComponent } from './components/add-new-advertiser/add-new-advertiser.component';
import { AllAdvertisersComponent } from './components/all-advertisers/all-advertisers.component';
import { EditAdvertiserComponent } from './components/edit-advertiser/edit-advertiser.component';
import { AdvertiserPropertiesComponent } from './components/advertiser-properties/advertiser-properties.component';
import { UserAccessComponent } from './components/user-access/user-access.component';

const routes: Routes = [

  {
    path: 'edit-advertiser/:advertiserId',
    component: EditAdvertiserComponent,
    children: [
      {
        path: '',
        component: AdvertiserPropertiesComponent
      },
      {
        path: 'user-access',
        component: UserAccessComponent
      },
      {
        path: 'edit-user/:userId',
        component: UserAccessComponent
      }
    ]
  },
  {
    path: 'add-new',
    component: AddNewAdvertiserComponent
  },
  {
    path: '',
    component: AllAdvertisersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertiserRoutingModule { }
