import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandingRoutingModule } from './branding-routing.module';
import { CommonComponent } from './components/common/common.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LeftSidePanelComponent } from './components/left-side-panel/left-side-panel.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRippleModule, MatMenuModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatDialogModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component';

@NgModule({
  declarations: [CommonComponent, HeaderComponent, FooterComponent, LeftSidePanelComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrandingRoutingModule,
    MatExpansionModule,
    MatToolbarModule,
    DashboardModule,
    MatRippleModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [ErrorDialogComponent]
})
export class BrandingModule { }
