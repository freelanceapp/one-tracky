import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewZoneComponent } from './components/add-new-zone/add-new-zone.component';
import { AllZonesComponent } from './components/all-zones/all-zones.component';
import { NotFoundComponent } from 'src/app/modules/shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'add-new',
    component: AddNewZoneComponent
  },
  {
    path: ':id',
    component: AddNewZoneComponent
  },
  {
    path: '',
    component: AllZonesComponent
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
export class ZoneRoutingModule { }
