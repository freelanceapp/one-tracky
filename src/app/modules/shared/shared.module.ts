import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [NotFoundComponent, ErrorDialogComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    NotFoundComponent,
    ErrorDialogComponent
  ]
})
export class SharedModule { }
