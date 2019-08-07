import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignRoutingModule } from './campaign-routing.module';
import { AddNewCampaignComponent } from './components/add-new-campaign/add-new-campaign.component';
import { AllCampaignsComponent } from './components/all-campaigns/all-campaigns.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import {
  MatInputModule, MatRadioModule, MatDatepickerModule,
  MatCardModule, MatNativeDateModule, MatButtonModule, MatSelectModule, MatTableModule, MatPaginatorModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddNewCampaignComponent, AllCampaignsComponent],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatCardModule,
    MatNativeDateModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class CampaignModule { }
