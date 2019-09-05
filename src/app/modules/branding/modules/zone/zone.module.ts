import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZoneRoutingModule } from './zone-routing.module';
import { AddNewZoneComponent } from './components/add-new-zone/add-new-zone.component';
import { AllZonesComponent } from './components/all-zones/all-zones.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import {
  MatInputModule, MatRadioModule,
  MatCardModule, MatFormFieldModule,
  MatButtonModule, MatSelectModule, MatTableModule,
  MatPaginatorModule, MatSnackBarModule, MatTooltipModule, MatToolbarModule, MatRippleModule, MatSortModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditZoneComponent } from './components/edit-zone/edit-zone.component';
import { ZonePropertiesComponent } from './components/zone-properties/zone-properties.component';
import { AdvanceComponent } from './components/advance/advance.component';
import { LinkedBannerComponent } from './components/linked-banner/linked-banner.component';
import { ProbabilityComponent } from './components/probability/probability.component';
import { InvocationCodeComponent } from './components/invocation-code/invocation-code.component';

@NgModule({
  declarations: [AddNewZoneComponent, AllZonesComponent, EditZoneComponent, ZonePropertiesComponent, AdvanceComponent, LinkedBannerComponent, ProbabilityComponent, InvocationCodeComponent],
  imports: [
    CommonModule,
    ZoneRoutingModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatToolbarModule,
    MatRippleModule,
    MatSortModule
  ]
})
export class ZoneModule { }
