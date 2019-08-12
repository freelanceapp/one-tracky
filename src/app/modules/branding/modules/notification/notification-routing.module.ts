import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllNotificationComponent } from './components/all-notification/all-notification.component';
import { NotFoundComponent } from 'src/app/modules/shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: AllNotificationComponent
  }
  ,
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
