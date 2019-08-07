import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-campaign',
  templateUrl: './add-new-campaign.component.html',
  styleUrls: ['./add-new-campaign.component.scss']
})
export class AddNewCampaignComponent implements OnInit {


  isNewCampaign: boolean = true;

  /** Campaign from group */
  cmpForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.createCpmForm();
  }

  ngOnInit() {

  }

  private createCpmForm() {
    this.cmpForm = this.fb.group({
      campaignId: [''],
      campaignName: ['', [Validators.required]],
      comments: ['']
    });
  }


  public clearExpirationDate() {

  }

}
