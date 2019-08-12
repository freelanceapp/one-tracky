import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BannerTypeEnum } from 'src/app/modules/branding/enums/banner-type.enum';

@Component({
  selector: 'app-add-new-banner',
  templateUrl: './add-new-banner.component.html',
  styleUrls: ['./add-new-banner.component.scss']
})
export class AddNewBannerComponent implements OnInit {
  public bannerForm: FormGroup

  constructor(private fb: FormBuilder) { }

  public createBannerForm() {
    return this.fb.group({
      bannerId: [null],
      campaignId: [null],
      bannerName: ['', Validators.required],
      bannerType: [BannerTypeEnum.Standard],
      bannerImage: [null, Validators.required],
      width: ['', Validators.required],
      height: ['', Validators.required],
      trackingPixel: '',
      comments: '',
      keyword: '',
      destinationUrl: ['', Validators.required],
      weight: null,

    })
  }


  public onSubmit() {

    console.log(this.bannerForm.value);
  }
  ngOnInit() {
    this.bannerForm = this.createBannerForm();
  }

}
