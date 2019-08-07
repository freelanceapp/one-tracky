import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerRoutingModule } from './banner-routing.module';
import { AddNewBannerComponent } from './components/add-new-banner/add-new-banner.component';
import { AllBannersComponent } from './components/all-banners/all-banners.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MatInputModule, MatSelectModule, MatTableModule, MatCardModule, MatFormFieldModule } from '@angular/material';

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
    MatFormFieldModule
  ]
})
export class BannerModule { }