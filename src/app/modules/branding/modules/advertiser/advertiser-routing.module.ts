import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewAdvertiserComponent } from './components/add-new-advertiser/add-new-advertiser.component';
import { AllAdvertisersComponent } from './components/all-advertisers/all-advertisers.component';

const routes: Routes = [
  {
    path: 'add-new',
    component: AddNewAdvertiserComponent
  },
  {
    path: ':id',
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
