import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AdvertiserService } from 'src/app/modules/branding/services/advertiser/advertiser.service';
import { AdvertiserModel } from 'src/app/modules/branding/model/advertiser.model';
import { CustomValidators } from 'src/app/modules/branding/custom-validators/custom-validators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-new-advertiser',
  templateUrl: './add-new-advertiser.component.html',
  styleUrls: ['./add-new-advertiser.component.scss']
})
export class AddNewAdvertiserComponent implements OnInit {

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
      const advId: string = this.activatedRoute.snapshot.paramMap.get('id');
      this.advertiserId = parseInt(advId, 10);

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
      this.advSvc.addAdvertiser(this.advSrForm.value).then(msg => {
        this.snackBar.open(msg, 'Ok');
        this.resetForm();
      }).catch(err => console.log(err));
      this.advSvc.updateAdvertisers(this.advSrForm.value).then(msg => {
        this.snackBar.open(msg, 'Ok');
      }).catch(err => console.log(err));
    }
  }


  private resetForm() {
    this.advSrForm.reset();
    Object.keys(this.advSrForm.controls).forEach(async key => {
      this.advSrForm.get(key).setErrors(null);
    });

  }

  private getAndPatchAdvertiser() {
    this.advSvc.getAdvertisers(this.advertiserId).then(adv => {
      this.patchAdvertiser(adv);
    }).catch(err => {
      alert(err);
    });
  }



}
