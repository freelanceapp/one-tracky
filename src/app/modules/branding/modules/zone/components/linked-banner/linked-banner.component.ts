import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinkBannerModel } from 'src/app/modules/branding/model/link-banner.model';
import { ZoneService } from 'src/app/modules/branding/services/zone/zone.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { BannerModel } from 'src/app/modules/branding/model/banner.model';

@Component({
  selector: 'app-linked-banner',
  templateUrl: './linked-banner.component.html',
  styleUrls: ['./linked-banner.component.scss']
})
export class LinkedBannerComponent implements OnInit {
  public websiteId: number = null;
  public zoneId: number = null;
  public linkBanner: LinkBannerModel = null;
  public errMsg: string = '';
  public linkBanenerForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private zonesvc: ZoneService, private fb: FormBuilder) {
    if (this.activatedRoute.parent.snapshot.paramMap.get('websiteId')) {
      this.websiteId = parseInt(this.activatedRoute.parent.snapshot.paramMap.get('websiteId'), 10);
    }
    if (this.activatedRoute.parent.snapshot.paramMap.get('zoneId')) {
      this.zoneId = parseInt(this.activatedRoute.parent.snapshot.paramMap.get('zoneId'), 10);
    }
    if (this.websiteId && this.zoneId) {
      this.getLinkBanner();
    }



  }
  displayedColumns: string[] = ['position', 'name', 'size', 'action'];
  dataSource: MatTableDataSource<BannerModel>

  public getLinkBanner() {
    this.zonesvc.getLinkBannerData(this.websiteId, this.zoneId)
      .then(resp => {
        this.linkBanner = resp;
      })
      .catch(err => {
        this.errMsg = err;
      });
  }


  public getCampaignList() {
    let avdId = this.linkBanenerForm.controls['advertiserList'].value;
    this.zonesvc.getLinkBannerData(this.websiteId, this.zoneId, avdId)
      .then(resp => {
        this.linkBanner = resp;
      })
      .catch(err => {
        this.errMsg = err;
      });
  }
  public getBannerList() {
    let avdId = this.linkBanenerForm.controls['advertiserList'].value;
    let cmpId = this.linkBanenerForm.controls['campaignList'].value;

    this.zonesvc.getLinkBannerData(this.websiteId, this.zoneId, avdId, cmpId)
      .then(resp => {
        this.linkBanner = resp;
      })
      .catch(err => {
        this.errMsg = err;
      });
  }



  public createLinkBannerForm() {
    return this.fb.group({
      advertiserList: ['', Validators.required],
      campaignList: ['', Validators.required],
      bannerList: ['', Validators.required],
    });
  }
  public onSubmit() {
    if (this.linkBanenerForm.valid) {
      let avdId = this.linkBanenerForm.controls['advertiserList'].value;
      let cmpId = this.linkBanenerForm.controls['campaignList'].value;
      let bnrId = this.linkBanenerForm.controls['bannerList'].value;

      this.zonesvc.getLinkedBannerList(this.websiteId, this.zoneId, avdId, cmpId, bnrId)
        .then(resp => {
          this.dataSource = new MatTableDataSource<BannerModel>(resp)
        })
        .catch(err => {
          this.errMsg = err;
        })
    }
  }
  ngOnInit() {
    this.linkBanenerForm = this.createLinkBannerForm();
  }


}
