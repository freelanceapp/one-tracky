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
  MatPaginatorModule, MatSnackBarModule, MatTooltipModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditZoneComponent } from './components/edit-zone/edit-zone.component';
@NgModule({
  declarations: [AddNewZoneComponent, AllZonesComponent, EditZoneComponent],
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
    MatTooltipModule
  ]
})
export class ZoneModule { }
