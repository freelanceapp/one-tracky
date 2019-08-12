import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { AddNewWebsiteComponent } from './components/add-new-website/add-new-website.component';
import { AllWebsiteComponent } from './components/all-website/all-website.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import {
  MatInputModule, MatRadioModule,
  MatCardModule, MatFormFieldModule,
  MatButtonModule, MatSelectModule, MatTableModule,
  MatPaginatorModule, MatSnackBarModule, MatTooltipModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddNewWebsiteComponent, AllWebsiteComponent],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SharedModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WebsiteModule { }
