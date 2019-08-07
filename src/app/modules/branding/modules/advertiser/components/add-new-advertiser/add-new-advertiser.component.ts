import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdvertiserService } from 'src/app/modules/branding/services/advertiser/advertiser.service';
import { AdvertiserModel } from 'src/app/modules/branding/model/advertiser.model';

@Component({
  selector: 'app-add-new-advertiser',
  templateUrl: './add-new-advertiser.component.html',
  styleUrls: ['./add-new-advertiser.component.scss']
})
export class AddNewAdvertiserComponent implements OnInit {

  public isNewAdvertiser: boolean = true;
  public advSrForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private advSvc: AdvertiserService
  ) {

  }

  ngOnInit() {
    this.createAdvSrForm().then(() => {
      const advId: string = this.activatedRoute.snapshot.paramMap.get('id');
      if (advId) {
        this.isNewAdvertiser = false;
        this.getAndPatchAdvertiser(parseInt(advId, 10));
      }
    });
  }


  private createAdvSrForm(): Promise<boolean> {
    this.advSrForm = this.fb.group({
      advertiserId: [''],
      advertiserName: ['', [Validators.required]],
      phoneNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      reportInterval: ['', []],
      comments: [''],
      reportDeactivate: [false],
      report: [false],
    });
    return Promise.resolve(true);
  }


  private patchAdvertiser(adv: AdvertiserModel) {
    this.advSrForm.patchValue({
      advertiserId: adv.advertiserId,
      advertiserName: adv.advertiserName,
      phoneNo: adv.phoneNo,
      email: adv.email,
      reportInterval: adv.reportInterval,
      comments: adv.comments,
      reportDeactivate: adv.reportDeactivate,
      report: adv.report,
    });
  }

  onSubmit() {
    if (this.advSrForm.valid) {
      if (this.isNewAdvertiser) {
        this.advSvc.addAdvertiser(this.advSrForm.value).then(msg => {
          alert(msg);
        }).catch(err => console.log(err));
      } else {
        this.advSvc.updateAdvertisers(this.advSrForm.value).then(msg => {
          alert(msg);
        }).catch(err => console.log(err));
      }

    }
  }

  private getAndPatchAdvertiser(advId: number) {
    this.advSvc.getAdvertisers(advId).then(adv => {
      this.patchAdvertiser(adv);
    }).catch(err => {
      alert(err);
    });
  }



}
