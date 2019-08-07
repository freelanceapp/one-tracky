import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewCampaignComponent } from './components/add-new-campaign/add-new-campaign.component';
import { AllCampaignsComponent } from './components/all-campaigns/all-campaigns.component';
import { NotFoundComponent } from 'src/app/modules/shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path : 'add-new',
    component : AddNewCampaignComponent
  },
  {
    path : ':id',
    component : AddNewCampaignComponent
  },
  {
    path : '',
    component : AllCampaignsComponent
  },
  {
    path : '**',
    component : NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
