import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewWebsiteComponent } from './components/add-new-website/add-new-website.component';
import { NotFoundComponent } from 'src/app/modules/shared/components/not-found/not-found.component';
import { AllWebsiteComponent } from './components/all-website/all-website.component';
import { EditWebsiteComponent } from './components/edit-website/edit-website.component';
import { WebsitePropertiesComponent } from './components/website-properties/website-properties.component';
import { UserAccessComponent } from './components/user-access/user-access.component';

const routes: Routes = [

  {
    path: 'edit-website/:websiteId',
    component: EditWebsiteComponent,
    children: [
      {
        path: '',
        component: WebsitePropertiesComponent
      },
      {
        path: 'user-access',
        component: UserAccessComponent
      },
      {
        path: 'edit-user/:userId',
        component: UserAccessComponent
      }
    ]
  },
  {
    path: 'add-new',
    component: AddNewWebsiteComponent
  },
  {
    path: '',
    component: AllWebsiteComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
