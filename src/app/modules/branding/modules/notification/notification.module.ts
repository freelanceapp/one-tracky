import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { AllNotificationComponent } from './components/all-notification/all-notification.component';
import { MatTableModule, MatPaginatorModule,MatInputModule, MatSnackBarModule, MatTooltipModule, MatFormFieldModule } from '@angular/material';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  declarations: [AllNotificationComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatTooltipModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class NotificationModule { }
