import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



/* import { HeaderComponent } from './views/components/header/header.component';
import { SidebarComponent } from './views/components/sidebar/sidebar.component'; */
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { HomeComponent } from './views/pages/home/home.component';
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
import { EditPageComponent } from './views/pages/edit-page/edit-page.component';


const routes: Routes = [

  { path: "dashboard", component: DashboardComponent },
  { path: "home", component: HomeComponent },
  { path: "list-advertiser", component: ListAdvertiserComponent },
  { path: "add-advertiser", component: AddAdvertiserComponent },
  { path: "camp-category-add", component: CampCategoryAddComponent },
  { path: "camp-category-edit/:id", component: CampCategoryEditComponent },
  { path: "camp-category", component: CampCategoryComponent },
  { path: "camp-create", component: CampCreateComponent },
  { path: "camp-details", component: CampDetailsComponent },
  { path: "list-camp", component: ListCampComponent },
  { path: "add-employee", component: AddEmployeeComponent },
  { path: "employee-details", component: EmployeeDetailsComponent },
  { path: "list-employee", component: ListEmployeeComponent },
  { path: "add-publisher", component: AddPublisherComponent },
  { path: "list-publisher", component: ListPublisherComponent },
  { path: "postback-publisher", component: PostbackPublisherComponent },
  { path: "add-redirection", component: AddRedirectionComponent },
  { path: "edit-redirection/:id", component: EditRedirectionComponent },
  { path: "advertiser-click-logs", component: AdvertiserClickLogsComponent },
  { path: "advertiser-postbacks", component: AdvertiserPostbacksComponent },
  { path: "advertiser-report", component: AdvertiserReportComponent },
  { path: "campaign-report", component: CampaignReportComponent },
  { path: "profit-loss", component: ProfitLossComponent },
  { path: "publisher-click-logs", component: PublisherClickLogsComponent },
  { path: "publisher-postbacks", component: PublisherPostbacksComponent },
  { path: "publisher-report", component: PublisherReportComponent },
  { path: "redirection-report", component: RedirectionReportComponent },
  { path: "list-redirection", component: ListRedirectionComponent },
  { path: "edit-page/:id", component: EditPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
]

@NgModule({
  declarations: [

    
  ],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceRoutingModule { }
