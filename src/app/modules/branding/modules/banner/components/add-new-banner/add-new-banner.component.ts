import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BannerTypeEnum } from 'src/app/modules/branding/enums/banner-type.enum';
import { BannerService } from 'src/app/modules/branding/services/banner/banner.service';
import { CustomValidators } from 'src/app/modules/branding/custom-validators/custom-validators';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { BannerModel } from 'src/app/modules/branding/model/banner.model';

@Component({
  selector: 'app-add-new-banner',
  templateUrl: './add-new-banner.component.html',
  styleUrls: ['./add-new-banner.component.scss']
})
export class AddNewBannerComponent implements OnInit {
  public bannerForm: FormGroup;
  @ViewChild('videoFile') videoFile;
  @ViewChild('imageFile') imageFile;
  public campaignId: number = null;
  public bannerId: number = null;
  public errMsg: string = '';
  constructor(
    private fb: FormBuilder,
    private bannerService: BannerService,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
  ) {
    /** get banner,campaign id by activated route  add values in variables */
    if (this.activatedRoute.snapshot.paramMap.get('bannerId')) {
      this.bannerId = parseInt(this.activatedRoute.snapshot.paramMap.get('bannerId'), 10);
    }
    if (this.activatedRoute.snapshot.paramMap.get('campaignId')) {
      this.campaignId = parseInt(this.activatedRoute.snapshot.paramMap.get('campaignId'), 10);
    }
    /** get banner,campaign id by activated route  add values in variables  end */


    /** get banner by banner id function call if banner id   */
    if (this.bannerId) {
      this.getBannerById();
    }
    /** get banner by bannerid function call if banner id   */

    /** create form initial call function   strat */
    this.createBannerForm();
    /** create form initial call function  end */

  }

  /** get banner by id function start */

  private getBannerById() {
    this.bannerService.getBanner(this.bannerId)
      .then(banner => {
        this.setBanner(banner);
      })
      .catch(err => {
        this.errMsg = err;
      });
  }
  /** get banner by id function end  */



  /** set banner form in case of edit function start */

  private setBanner(banner: BannerModel) {

    this.bannerForm.patchValue({
      bannerId: banner.bannerId,
      campaignId: banner.campaignId,
      bannerName: banner.bannerName,
      bannerType: banner.bannerType,
      width: banner.width,
      height: banner.height,
      weight: banner.weight,
      trackingPixel: banner.trackingPixel,
      comments: banner.comments,
      keyword: banner.keyword,
      destinationUrl: banner.destinationUrl,
      code: banner.code,
      mute: banner.mute,
      skip: banner.skip,
      skipTime: banner.skipTime,
      bitrate: banner.bitrate,
      videoDeliveryMethod: banner.videoDeliveryMethod,
      videoDuration: banner.videoDuration,
      videoDelType: banner.videoDelType,
      videoType: banner.videoType,
      impressionPixel: banner.impressionPixel,
      clickPixel: banner.clickPixel,
      startPixel: banner.startPixel,
      quaterPixel: banner.quaterPixel,
      midPixel: banner.midPixel,
      tQuaterPixel: banner.thirdQuaterPixel,
      endPixel: banner.endPixel,
      invocationTag: banner.invocationTag
    });
    this.addValidation();
    this.setVideoValidation();

  }

  /** set banner form in case of edit function end */

  /** create banner form function start  */


  public createBannerForm(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.bannerForm = this.fb.group({
        bannerId: [null],
        campaignId: this.campaignId,
        bannerName: ['', [Validators.required, CustomValidators.isAlphaNumericWithSpace]],
        bannerType: [BannerTypeEnum.Web.toString()],
        imageBanner: [null, Validators.required],
        videoBanner: null,
        width: ['', [Validators.required, CustomValidators.isUint]],
        height: ['', [Validators.required, CustomValidators.isUint]],
        trackingPixel: '',
        comments: '',
        keyword: '',
        destinationUrl: ['', [Validators.required, CustomValidators.isUrl]],
        weight: [null, [CustomValidators.isUint]],
        code: [''],
        mute: false,
        skip: false,
        skipTime: '',
        bitrate: 360,
        videoDeliveryMethod: 'progressive',
        videoDuration: 30,
        videoDelType: 'create_video',
        videoType: 'mp4',
        impressionPixel: ['', CustomValidators.isUrl],
        clickPixel: ['', CustomValidators.isUrl],
        startPixel: ['', CustomValidators.isUrl],
        quaterPixel: ['', CustomValidators.isUrl],
        midPixel: ['', CustomValidators.isUrl],
        tQuaterPixel: ['', CustomValidators.isUrl],
        endPixel: ['', CustomValidators.isUrl],
        invocationTag: ''
      });
      resolve(true);
    });
  }

  /** create banner form function end  */


  /** add conditional validation function start  */

  public addValidation() {
    let controls = this.bannerForm.controls;
    let bannerType = controls['bannerType'].value;
    if (bannerType === BannerTypeEnum.Web) {
      controls['code'].clearValidators();
      controls['code'].updateValueAndValidity();
      controls['videoBanner'].clearValidators();
      controls['videoBanner'].updateValueAndValidity();
      controls['invocationTag'].clearValidators();
      controls['invocationTag'].updateValueAndValidity();
      controls['imageBanner'].setValidators([Validators.required]);
      controls['imageBanner'].updateValueAndValidity();
      controls['videoBanner'].clearValidators();
      controls['videoBanner'].updateValueAndValidity();
    }
    if (bannerType === BannerTypeEnum.Html5) {
      controls['code'].setValidators([Validators.required]);
      controls['code'].updateValueAndValidity();
      controls['imageBanner'].clearValidators();
      controls['imageBanner'].updateValueAndValidity();
      controls['width'].setValidators([Validators.required]);
      controls['width'].updateValueAndValidity();
      controls['height'].setValidators([Validators.required]);
      controls['height'].updateValueAndValidity();
      controls['invocationTag'].clearValidators();
      controls['invocationTag'].updateValueAndValidity();
      controls['videoBanner'].clearValidators();
      controls['videoBanner'].updateValueAndValidity();
    }
    if (bannerType === BannerTypeEnum.Html) {
      controls['code'].clearValidators();
      controls['code'].updateValueAndValidity();
      controls['imageBanner'].clearValidators();
      controls['imageBanner'].updateValueAndValidity();
      controls['videoBanner'].setValidators([Validators.required]);
      controls['videoBanner'].updateValueAndValidity();
    }
  }

  /** add conditional validation function end  */

  /** set validation for video type function start */

  private setVideoValidation() {
    let controls = this.bannerForm.controls
    if (controls['videoDelType'].value === 'upload_video') {
      controls['invocationTag'].setValidators([Validators.required]);
      controls['invocationTag'].updateValueAndValidity();
      controls['videoBanner'].clearValidators();
      controls['videoBanner'].updateValueAndValidity();
      controls['width'].clearValidators();
      controls['width'].updateValueAndValidity();
      controls['height'].clearValidators();
      controls['height'].updateValueAndValidity();
    }
    if (controls['videoDelType'].value === 'create_video') {
      controls['invocationTag'].clearValidators();
      controls['invocationTag'].updateValueAndValidity();
      controls['videoBanner'].setValidators([Validators.required]);
      controls['videoBanner'].updateValueAndValidity();
      controls['width'].setValidators([Validators.required, CustomValidators.isUint]);
      controls['width'].updateValueAndValidity();
      controls['height'].setValidators([Validators.required, CustomValidators.isUint]);
      controls['height'].updateValueAndValidity();
    }
  }

  /** set validation for video type function start */

  /** on submit function start */

  public onSubmit() {
    if (this.bannerForm.valid) {
      const formData = this.getFormData();
      if (this.bannerId) {
        this.bannerService.editBanner(this.bannerId, formData)
          .then(rep => {
            this.snackbar.open('banner successfully updates', 'done', {
              duration: 2000,
            });
          })
          .catch(err => {
            this.errMsg = err;
          })
      } else {
        this.bannerService.addBanner(formData).then(resp => {
          this.snackbar.open('banner successfully added', 'done', {
            duration: 2000,
          });
        })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }

  /** on submit function end  */

  /** get form data function start */

  private getFormData() {
    const controls = this.bannerForm.controls;
    const imageToSend = this.imageFile.nativeElement;
    const videoToSend = this.videoFile.nativeElement;
    const formData = new FormData();
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

    if (this.bannerId) {
      formData.append("bannerid", this.bannerId.toString());
    }


    if (controls['bannerType'].value === BannerTypeEnum.Web) {
      if (imageToSend.files && imageToSend.files[0]) {
        const fileToUpload = imageToSend.files[0];
        formData.append('filename', fileToUpload);
      }


    }
    if (controls['bannerType'].value === BannerTypeEnum.Html5) {
      formData.append('htmltemplate', controls['code'].value as string);
    }
    if (controls['bannerType'].value === BannerTypeEnum.Html) {

      if (controls['videoDelType'].value === 'upload_video') {
        formData.delete('width');
        formData.delete('height');
        formData.append('ext_bannertype', controls['videoDelType'].value as string);
        formData.append('vast_tag', controls['invocationTag'].value as string);
      }
      if (controls['videoDelType'].value === 'create_video') {
        if (videoToSend.files && videoToSend.files[0]) {
          const fileToUpload = videoToSend.files[0];
          formData.append('video_upload', fileToUpload);
        }
        formData.append('ext_bannertype', controls['videoDelType'].value as string);
        formData.append('impression_pixel', controls['impressionPixel'].value as string);
        formData.append('start_pixel', controls['startPixel'].value as string);
        formData.append('quater_pixel', controls['quaterPixel'].value as string);
        formData.append('mid_pixel', controls['midPixel'].value as string);
        formData.append('third_quater_pixel', controls['tQuaterPixel'].value as string);
        formData.append('end_pixel', controls['endPixel'].value as string);
        formData.append('third_party_click', controls['clickPixel'].value as string);
        formData.append('vast_video_type', controls['videoType'].value as string);
        formData.append('mute', controls['mute'].value as string);
        formData.append('vast_video_bitrate', controls['bitrate'].value as string);
        formData.append('vast_video_delivery', controls['videoDeliveryMethod'].value as string);
        formData.append('vast_video_duration', controls['videoDuration'].value as string);
        formData.append('skip', controls['skip'].value as string);
        formData.append('skip_time', controls['skipTime'].value as string);


      }
    }

    return formData;
  }

  /** get form data function end  */

  ngOnInit() {

  }

}
