import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdvertiserService } from 'src/app/modules/branding/services/advertiser/advertiser.service';
import { MatSnackBar } from '@angular/material';
import { AdvertiserModel } from 'src/app/modules/branding/model/advertiser.model';
import { CustomValidators } from 'src/app/modules/branding/custom-validators/custom-validators';

@Component({
  selector: 'app-advertiser-properties',
  templateUrl: './advertiser-properties.component.html',
  styleUrls: ['./advertiser-properties.component.scss']
})
export class AdvertiserPropertiesComponent implements OnInit {

  public isNewAdvertiser: boolean = true;
  public advSrForm: FormGroup;
  public advertiserId: number = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private advSvc: AdvertiserService,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {
    this.createAdvSrForm().then(() => {
      const advId: string = this.activatedRoute.parent.snapshot.paramMap.get('advertiserId');
      this.advertiserId = parseInt(advId, 10);
      if (this.advertiserId) {
        this.getAndPatchAdvertiser();
      }
    });
  }


  private createAdvSrForm(): Promise<boolean> {
    this.advSrForm = this.fb.group({
      advertiserId: [''],
      advertiserName: ['', [Validators.required, CustomValidators.isAlphaNumericWithSpace]],
      phoneNo: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.isEmail]],
      reportInterval: ['', [Validators.min(1)]],
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
      this.advSvc.updateAdvertisers(this.advSrForm.value).then(msg => {
        this.snackBar.open(msg, 'Ok');
      }).catch(err => console.log(err));
    }
  }

  private resetForm() {
    this.advSrForm.reset();

  }

  private getAndPatchAdvertiser() {
    this.advSvc.getAdvertisers(this.advertiserId).then(adv => {
      this.patchAdvertiser(adv);
    }).catch(err => {
      alert(err);
    });
  }


}
