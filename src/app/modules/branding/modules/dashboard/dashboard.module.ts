import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import {
  MatTableModule, MatPaginatorModule, MatInputModule, MatCardModule,
  MatRadioModule,
  MatButtonModule,
  MatCheckboxModule,
  MatSelectModule, MatSnackBarModule, MatTooltipModule, MatFormFieldModule
} from '@angular/material';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,

  ]
})
export class DashboardModule { }
