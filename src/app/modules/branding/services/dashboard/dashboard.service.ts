import { Injectable } from '@angular/core';
import { BrandingModule } from '../../branding.module';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: BrandingModule
})
export class DashboardService {

  constructor(private http: HttpService) {


  }



}
