import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewWebsiteComponent } from './components/add-new-website/add-new-website.component';
import { NotFoundComponent } from 'src/app/modules/shared/components/not-found/not-found.component';
import { AllWebsiteComponent } from './components/all-website/all-website.component';

const routes: Routes = [
  {
    path: 'add-new',
    component: AddNewWebsiteComponent
  },
  {
    path: ':id',
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
