import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZoneRoutingModule } from './zone-routing.module';
import { AddNewZoneComponent } from './components/add-new-zone/add-new-zone.component';
import { AllZonesComponent } from './components/all-zones/all-zones.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MatInputModule, MatSelectModule, MatRadioModule, MatCardModule, MatFormFieldModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [AddNewZoneComponent, AllZonesComponent],
  imports: [
    CommonModule,
    ZoneRoutingModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatFormFieldModule,
    MatButtonModule
  ]
})
export class ZoneModule { }
