import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewBannerComponent } from './components/add-new-banner/add-new-banner.component';
import { AllBannersComponent } from './components/all-banners/all-banners.component';
import { NotFoundComponent } from 'src/app/modules/shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'add-new',
    component: AddNewBannerComponent
  },
  {
    path : ':id',
    component : AddNewBannerComponent
  },
  {
    path : '',
    component : AllBannersComponent
  },
  {
    path  : '**',
    component : NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannerRoutingModule { }
