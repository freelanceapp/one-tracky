import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertiserRoutingModule } from './advertiser-routing.module';
import { AddNewAdvertiserComponent } from './components/add-new-advertiser/add-new-advertiser.component';
import { AllAdvertisersComponent } from './components/all-advertisers/all-advertisers.component';
import {
  MatCardModule, MatButtonModule, MatInputModule,
  MatFormFieldModule, MatCheckboxModule, MatTableModule, MatPaginatorModule, MatTooltipModule
} from '@angular/material';
import { AdvertiserService } from '../../services/advertiser/advertiser.service';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddNewAdvertiserComponent, AllAdvertisersComponent],
  imports: [
    CommonModule,
    AdvertiserRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatTooltipModule
  ],
  providers: [AdvertiserService]
})
export class AdvertiserModule { }
