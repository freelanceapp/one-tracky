import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertiserRoutingModule } from './advertiser-routing.module';
import { AddNewAdvertiserComponent } from './components/add-new-advertiser/add-new-advertiser.component';
import { AllAdvertisersComponent } from './components/all-advertisers/all-advertisers.component';
import {
  MatCardModule, MatButtonModule, MatInputModule,
  MatFormFieldModule, MatCheckboxModule, MatTableModule,
  MatPaginatorModule, MatTooltipModule, MatSnackBarModule,
  MatSortModule, MatToolbarModule, MatSelectModule
} from '@angular/material';
import { AdvertiserService } from '../../services/advertiser/advertiser.service';
import { ReactiveFormsModule } from '@angular/forms';
import { EditAdvertiserComponent } from './components/edit-advertiser/edit-advertiser.component';
import { AdvertiserPropertiesComponent } from './components/advertiser-properties/advertiser-properties.component';
import { UserAccessComponent } from './components/user-access/user-access.component';



@NgModule({
  declarations: [AddNewAdvertiserComponent, AllAdvertisersComponent, EditAdvertiserComponent, AdvertiserPropertiesComponent, UserAccessComponent],
  imports: [
    CommonModule,
    AdvertiserRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule
  ],
  providers: [AdvertiserService]
})
export class AdvertiserModule { }
