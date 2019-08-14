import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BannerTypeEnum } from 'src/app/modules/branding/enums/banner-type.enum';
import { BannerService } from 'src/app/modules/branding/services/banner/banner.service';
import { CustomValidators } from 'src/app/modules/branding/custom-validators/custom-validators';

@Component({
  selector: 'app-add-new-banner',
  templateUrl: './add-new-banner.component.html',
  styleUrls: ['./add-new-banner.component.scss']
})
export class AddNewBannerComponent implements OnInit {
  public bannerForm: FormGroup;
  @ViewChild('fileInput') fileInput;
  constructor(private fb: FormBuilder, private bannerService: BannerService) { }

  public createBannerForm() {
    return this.fb.group({
      bannerId: [null],
      campaignId: [1],
      bannerName: ['', [Validators.required, CustomValidators.isAlphaNumericWithSpace]],
      bannerType: [BannerTypeEnum.Standard],
      // bannerImage: [null, Validators.required],
      width: ['', [Validators.required, CustomValidators.isUint]],
      height: ['', [Validators.required, CustomValidators.isUint]],
      trackingPixel: '',
      comments: '',
      keyword: '',
      destinationUrl: ['', [Validators.required, CustomValidators.isUrl]],
      weight: [null, [CustomValidators.isUint]],
      code: ['']
    });
  }


  public onSubmit() {
    if (this.bannerForm.valid) {
      const formData = this.getFormData();
      this.bannerService.addBanner(formData).then(resp => {
        console.log(resp);
      })
        .catch(err => {
          console.log(err);
        });
    }
  }


  private getFormData() {
    const controls = this.bannerForm.controls;
    const fi = this.fileInput.nativeElement;
    const formData = new FormData();
    if (fi.files && fi.files[0]) {
      const fileToUpload = fi.files[0];
      formData.append('banner', fileToUpload);
    }

    formData.append('storagetype', controls['bannerType'].value);
    formData.append('description', controls['bannerName'].value as string);
    formData.append('url', controls['destinationUrl'].value as string);
    formData.append('tracking_pixel', controls['trackingPixel'].value as string);
    formData.append('keyword', controls['keyword'].value as string);
    formData.append('weight', controls['weight'].value as string);
    formData.append('comments', controls['comments'].value as string);
    formData.append('width', controls['width'].value as string);
    formData.append('height', controls['height'].value as string);


    formData.append('campaignid', controls['campaignId'].value as string);
    // formData.append("bannerid", controls['bannerId'].value as string);

    // formData.delete('campaignid')
    return formData;
  }

  ngOnInit() {
    this.bannerForm = this.createBannerForm();
  }

}
