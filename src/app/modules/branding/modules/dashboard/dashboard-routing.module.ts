import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentOneComponent } from './components/component-one/component-one.component';
import { NotFoundComponent } from 'src/app/modules/shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'component-one',
    component: ComponentOneComponent
  },
  {
    path: '',
    redirectTo: 'component-one',
    pathMatch: 'full'
  }, {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
