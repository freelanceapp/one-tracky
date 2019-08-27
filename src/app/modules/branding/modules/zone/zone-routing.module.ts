import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewZoneComponent } from './components/add-new-zone/add-new-zone.component';
import { AllZonesComponent } from './components/all-zones/all-zones.component';
import { NotFoundComponent } from 'src/app/modules/shared/components/not-found/not-found.component';
import { EditZoneComponent } from './components/edit-zone/edit-zone.component';
import { ZonePropertiesComponent } from './components/zone-properties/zone-properties.component';
import { AdvanceComponent } from './components/advance/advance.component';
import { LinkedBannerComponent } from './components/linked-banner/linked-banner.component';
import { ProbabilityComponent } from './components/probability/probability.component';
import { InvocationCodeComponent } from './components/invocation-code/invocation-code.component';


const routes: Routes = [

  {
    path: 'edit-zone/:websiteId/:zoneId',
    component: EditZoneComponent,
    children: [
      {
        path: '',
        component: ZonePropertiesComponent
      },
      {
        path: 'advance',
        component: AdvanceComponent
      },
      {
        path: 'linked-banner',
        component: LinkedBannerComponent
      },
      {
        path: 'probabilty',
        component: ProbabilityComponent
      },
      {
        path: 'invocation-code',
        component: InvocationCodeComponent
      }
    ]
  },
  {
    path: '/:websiteId/:zoneId',
    component: AdvanceComponent
  },
  {
    path: 'add-new',
    component: AddNewZoneComponent
  },
  {
    path: '',
    component: AllZonesComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
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
