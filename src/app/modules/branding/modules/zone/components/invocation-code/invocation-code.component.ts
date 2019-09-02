import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ZoneService } from 'src/app/modules/branding/services/zone/zone.service';
import { BannerModel } from 'src/app/modules/branding/model/banner.model';
import { BannerTypeEnum } from 'src/app/modules/branding/enums/banner-type.enum';
import { InvocationCodeModel } from 'src/app/modules/branding/model/invocation-code.model';

@Component({
  selector: 'app-invocation-code',
  templateUrl: './invocation-code.component.html',
  styleUrls: ['./invocation-code.component.scss']
})
export class InvocationCodeComponent implements OnInit {

  public websiteId: number = null;
  public zoneId: number = null;
  public invocationForm: FormGroup;
  public zoneType: string = '';
  public errMsg: string = '';

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private zonesvc: ZoneService) {
    if (this.activatedRoute.parent.snapshot.paramMap.get('websiteId')) {
      this.websiteId = parseInt(this.activatedRoute.parent.snapshot.paramMap.get('websiteId'), 10);
    }
    if (this.activatedRoute.parent.snapshot.paramMap.get('zoneId')) {
      this.zoneId = parseInt(this.activatedRoute.parent.snapshot.paramMap.get('zoneId'), 10);
    }
    if (this.websiteId && this.zoneId) {
      this.getZoneType();
    }
  }

  public getZoneType() {
    this.zonesvc.getZone(this.zoneId)
      .then(res => {
        this.zoneType = res.delivery;
        if (this.zoneType && this.websiteId && this.zoneId) {
          this.getInvocationCode();
        }
      })
      .catch(err => {
        this.errMsg = err;
      });
  }


  private getInvocationCode() {
    this.zonesvc.getInvocationCode(this.websiteId, this.zoneId, this.zoneType)
      .then(resp => {
        this.setInvocationForm(resp);
        console.log(resp)
      })
      .catch(err => {
        this.errMsg = err;
      });
  }


  private setInvocationForm(invocation: InvocationCodeModel) {
    this.invocationForm.patchValue({
      websiteId: invocation.websiteId,
      zoneId: invocation.zoneId,
      zoneType: invocation.zoneType,
      thirdPartyTrack: invocation.thirdPartyTrack,
      invocationCode: invocation.invocationCode
    });
  }

  private createinvocationForm() {
    return this.fb.group({
      websiteId: null,
      zoneId: null,
      zoneType: null,
      thirdPartyTrack: '',
      invocationCode: ''
    });
  }





  ngOnInit() {
    this.invocationForm = this.createinvocationForm();
  }

}
