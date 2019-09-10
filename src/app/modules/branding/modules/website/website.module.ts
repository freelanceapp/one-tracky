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
  MatPaginatorModule, MatSnackBarModule, MatTooltipModule, MatSortModule, MatCheckboxModule, MatToolbarModule,

} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditWebsiteComponent } from './components/edit-website/edit-website.component';
import { WebsitePropertiesComponent } from './components/website-properties/website-properties.component';
import { UserAccessComponent } from './components/user-access/user-access.component';



@NgModule({
  declarations: [AddNewWebsiteComponent, AllWebsiteComponent, EditWebsiteComponent, WebsitePropertiesComponent, UserAccessComponent],
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
    ReactiveFormsModule,
    MatSortModule,
    MatCheckboxModule,
    MatToolbarModule

  ]
})
export class WebsiteModule { }
