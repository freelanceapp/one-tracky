import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerRoutingModule } from './banner-routing.module';
import { AddNewBannerComponent } from './components/add-new-banner/add-new-banner.component';
import { AllBannersComponent } from './components/all-banners/all-banners.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import {
  MatInputModule,
  MatCardModule, MatFormFieldModule,
  MatSelectModule, MatTableModule, MatRadioModule, MatButtonModule,
  MatPaginatorModule, MatSnackBarModule, MatTooltipModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddNewBannerComponent, AllBannersComponent],
  imports: [
    CommonModule,
    BannerRoutingModule,
    SharedModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BannerModule { }