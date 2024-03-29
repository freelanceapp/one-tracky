import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/modules/branding/services/campaign/campaign.service';
import { CampaignModel } from 'src/app/modules/branding/model/campaign.model';
import { CustomValidators } from 'src/app/modules/branding/custom-validators/custom-validators';

@Component({
  selector: 'app-add-new-campaign',
  templateUrl: './add-new-campaign.component.html',
  styleUrls: ['./add-new-campaign.component.scss']
})
export class AddNewCampaignComponent implements OnInit {


  isNewCampaign: boolean = true;
  public minStartDate = new Date();
  public minEndDate = new Date(this.minStartDate.getFullYear(), this.minStartDate.getMonth(), this.minStartDate.getDay() + 5);

  /** Campaign from group */
  cmpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private campaignSvc: CampaignService,

  ) {
    this.createCpmForm().then(() => {
      this.handleConditionalValidation();
      this.getClientIdAndAvdId();
    });
  }

  ngOnInit() {

  }

  public onSubmit() {
    if (this.cmpForm.valid) {
      if (this.isNewCampaign) {
        this.campaignSvc.addCampaign(this.cmpForm.value)
          .then(resp => alert(resp))
          .catch(err => console.log(err));
      } else {
        this.campaignSvc.editCampaign(this.cmpForm.value)
          .then(resp => alert(resp))
          .catch(err => console.log(err));
      }
    }
  }

  private createCpmForm(): Promise<boolean> {
    return new Promise((res, rej) => {
      this.cmpForm = this.fb.group({
        campaignId: [''],
        advertiserId: [''],
        campaignName: ['', [Validators.required, CustomValidators.isAlphaNumericWithSpace]],
        startDate: ['', [Validators.required]],
        endDate: [''],
        pricingModel: [''],
        rate: ['', [Validators.min(1), CustomValidators.isInt]],
        views: [''],
        impressions: [{ value: '', disabled: false }, [Validators.min(1), CustomValidators.isInt]],
        priority: [''],
        targetType: [''],
        targetValue: [{ value: '', disabled: true }],
        cappingPeriod: ['', [Validators.min(1), CustomValidators.isInt]],
        cappingAmount: ['', [Validators.min(1), CustomValidators.isInt]],
        cappingPeriodType: [''],
        comments: ['']
      });
      res(true);
    });
  }


  private getClientIdAndAvdId() {
    const advertiserId: number = parseInt(this.actRoute.snapshot.paramMap.get('advertiserId'), 10);
    const campaignId: number = parseInt(this.actRoute.snapshot.paramMap.get('campaignId'), 10);
    if (campaignId) {
      this.isNewCampaign = false;
      this.getCampaign(campaignId);
    } else {
      const advertiserIdControl = this.cmpForm.get('advertiserId');
      advertiserIdControl.patchValue(advertiserId);
    }
  }

  private getCampaign(campaignId: number) {
    this.campaignSvc.getCampaigns(campaignId)
      .then(campaign => {
        this.patchCampForm(campaign);
      }).catch(err => {

      });
  }

  private patchCampForm(campaign: CampaignModel) {
    this.cmpForm.patchValue({
      campaignId: campaign.campaignId,
      advertiserId: campaign.advertiserId,
      campaignName: campaign.campaignName,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      pricingModel: campaign.pricingModel.toString(),
      rate: campaign.rate,
      views: campaign.views,
      impressions: campaign.impressions,
      priority: campaign.priority.toString(),
      targetType: campaign.targetType,
      targetValue: campaign.targetValue,
      cappingPeriod: campaign.cappingPeriod,
      cappingAmount: campaign.cappingAmount,
      cappingPeriodType: campaign.cappingPeriodType,
      comments: campaign.comments,
    });
  }

  public clearExpirationDate() {
    const expireDateControl = this.cmpForm.get('endDate');
    expireDateControl.setValue(null);
  }


  async handleConditionalValidation() {

    const checkBoxControl = this.cmpForm.get('views');
    const impressionsControl = this.cmpForm.get('impressions');

    checkBoxControl.valueChanges.subscribe(value => {
      if (value) {
        impressionsControl.setValue(null);
        impressionsControl.clearValidators();
        impressionsControl.disable();
      } else {
        impressionsControl.setValidators([Validators.min(1), CustomValidators.isInt]);
        impressionsControl.enable();
      }
      impressionsControl.updateValueAndValidity();
    });

    const targetTypeControl = this.cmpForm.get('targetType');
    const targetValueControl = this.cmpForm.get('targetValue');

    targetTypeControl.valueChanges.subscribe(value => {
      if (value) {
        targetValueControl.enable();
        targetValueControl.setValue(1);
        targetValueControl.setValidators([Validators.required, Validators.min(1)]);
      } else {
        targetValueControl.setValue(null);
        targetValueControl.disable();
        targetValueControl.setValidators(null);
      }

      targetValueControl.updateValueAndValidity();
    });
  }



}
