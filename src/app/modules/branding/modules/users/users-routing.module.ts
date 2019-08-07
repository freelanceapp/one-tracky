import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { AddNewUserComponent } from './components/add-new-user/add-new-user.component';

const routes: Routes = [
  {
    path: 'add-new',
    component: AddNewUserComponent
  },
  {
    path: ':id',
    component: AddNewUserComponent
  },
  {
    path: '',
    component: AllUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
