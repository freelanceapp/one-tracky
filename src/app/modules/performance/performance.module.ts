import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAdvertiserService} from '../performance/views/pages/advertiser/list-advertiser/list-advertiser.service';
import { ListPublisherService} from '../performance/views/pages/publisher/list-publisher/list-publisher.service';
import { AllPostbackPublisherService} from '../performance/views/pages/publisher/postback-publisher/postback-publisher.service';
import { ListCampaignCategoryService} from '../performance/views/pages/camp/camp-category/camp-category.service';
import { ListRedirectionService} from '../performance/views/pages/redirection/list-redirection/list-redirection.service';
import { ListEmployeeService} from '../performance/views/pages/employee/list-employee/list-employee.service';
import { ListCampaignService} from '../performance/views/pages/camp/list-camp/list-camp.service';



import { PerformanceRoutingModule } from './performance-routing.module';
import { MatInputModule,
          MatFormFieldModule,
          MatButtonModule,
          MatIconModule,
          MatSelectModule,
          MatGridListModule,
          MatExpansionModule,
          MatTableModule,
          MatCheckboxModule,
          MatPaginatorModule, 
          } from '@angular/material';

import { HomeComponent } from './views/pages/home/home.component';


import { HeaderComponent } from './views/components/header/header.component';
import { SidebarComponent } from './views/components/sidebar/sidebar.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { ListAdvertiserComponent } from './views/pages/advertiser/list-advertiser/list-advertiser.component';
import { AddAdvertiserComponent } from './views/pages/advertiser/add-advertiser/add-advertiser.component';
import { CampCategoryAddComponent } from './views/pages/camp/camp-category-add/camp-category-add.component';
import { CampCategoryEditComponent } from './views/pages/camp/camp-category-edit/camp-category-edit.component';
import { CampCategoryComponent } from './views/pages/camp/camp-category/camp-category.component';
import { CampCreateComponent } from './views/pages/camp/camp-create/camp-create.component';
import { CampDetailsComponent } from './views/pages/camp/camp-details/camp-details.component';
import { ListCampComponent } from './views/pages/camp/list-camp/list-camp.component';
import { AddEmployeeComponent } from './views/pages/employee/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './views/pages/employee/employee-details/employee-details.component';
import { ListEmployeeComponent } from './views/pages/employee/list-employee/list-employee.component';
import { AddPublisherComponent } from './views/pages/publisher/add-publisher/add-publisher.component';
import { ListPublisherComponent } from './views/pages/publisher/list-publisher/list-publisher.component';
import { PostbackPublisherComponent } from './views/pages/publisher/postback-publisher/postback-publisher.component';
import { AddRedirectionComponent } from './views/pages/redirection/add-redirection/add-redirection.component';
import { EditRedirectionComponent } from './views/pages/redirection/edit-redirection/edit-redirection.component';
import { AdvertiserClickLogsComponent } from './views/pages/reports/advertiser-click-logs/advertiser-click-logs.component';
import { AdvertiserPostbacksComponent } from './views/pages/reports/advertiser-postbacks/advertiser-postbacks.component';
import { AdvertiserReportComponent } from './views/pages/reports/advertiser-report/advertiser-report.component';
import { CampaignReportComponent } from './views/pages/reports/campaign-report/campaign-report.component';
import { ProfitLossComponent } from './views/pages/reports/profit-loss/profit-loss.component';
import { PublisherClickLogsComponent } from './views/pages/reports/publisher-click-logs/publisher-click-logs.component';
import { PublisherPostbacksComponent } from './views/pages/reports/publisher-postbacks/publisher-postbacks.component';
import { PublisherReportComponent } from './views/pages/reports/publisher-report/publisher-report.component';
import { RedirectionReportComponent } from './views/pages/reports/redirection-report/redirection-report.component';
import { ListRedirectionComponent } from './views/pages/redirection/list-redirection/list-redirection.component';
import { TableComponent } from './views/components/table/table.component';
import { EditComponent } from './views/components/edit/edit.component';
import { EditPageComponent } from './views/pages/edit-page/edit-page.component';



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    ListAdvertiserComponent,
    AddAdvertiserComponent,
    CampCategoryAddComponent,
    CampCategoryEditComponent,
    CampCategoryComponent,
    CampCreateComponent,
    CampDetailsComponent,
    ListCampComponent,
    AddEmployeeComponent,
    EmployeeDetailsComponent,
    ListEmployeeComponent,
    AddPublisherComponent,
    ListPublisherComponent,
    PostbackPublisherComponent,
    AddRedirectionComponent,
    EditRedirectionComponent,
    AdvertiserClickLogsComponent,
    AdvertiserPostbacksComponent,
    AdvertiserReportComponent,
    CampaignReportComponent,
    ProfitLossComponent,
    PublisherClickLogsComponent,
    PublisherPostbacksComponent,
    PublisherReportComponent,
    RedirectionReportComponent,
    ListRedirectionComponent,
    TableComponent,
    EditComponent,
    EditPageComponent,
  ],
  imports: [
    CommonModule,
    PerformanceRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatGridListModule,
    MatExpansionModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule, 
  ],
  providers:[
    ListAdvertiserService,
    ListPublisherService,
    AllPostbackPublisherService,
    ListCampaignCategoryService,
    ListRedirectionService,
    ListEmployeeService,
    ListCampaignService
  ]
})
export class PerformanceModule { }
