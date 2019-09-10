import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebsiteService } from 'src/app/modules/branding/services/website/website.service';
import { WebsiteModel } from 'src/app/modules/branding/model/website.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-website-properties',
  templateUrl: './website-properties.component.html',
  styleUrls: ['./website-properties.component.scss']
})
export class WebsitePropertiesComponent implements OnInit {
  public websiteId: number = null;
  public errMsg: string = '';
  public websiteForm: FormGroup;
  constructor(private activatedRoute: ActivatedRoute, private websiteSvc: WebsiteService
    , private fb: FormBuilder, private loginService: LoginService, private snackBar: MatSnackBar) {


    this.websiteId = parseInt(this.activatedRoute.parent.snapshot.paramMap.get('websiteId'), 10);
    if (this.websiteId) {
      this.getWebsiteByAffiliateID();
    }
  }


  public createWebsiteForm() {
    return this.fb.group({
      userId: [this.loginService.loggedInBrandingUser.userId],
      affiliateId: [''],
      domainName: ['', [Validators.required]],
      websiteURL: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      comments: [''],
    });
  }

  public getWebsiteByAffiliateID() {
    this.websiteSvc.getWebsite(this.websiteId)
      .then(resp => {
        this.setWebsiteForm(resp);
      });
  }

  private setWebsiteForm(website: WebsiteModel) {
    this.websiteForm.patchValue({
      userId: website.userId,
      affiliateId: website.affiliateId,
      domainName: website.domainName,
      websiteURL: website.websiteURL,
      contact: website.contact,
      email: website.email,
      comments: website.comments,
    });
  }

  public onSubmit() {
    if (this.websiteForm.valid) {
      const data = this.websiteForm.value;
      this.websiteSvc.editWebsite(this.websiteId, data)
        .then(resp => {
          this.getWebsiteByAffiliateID();
          this.snackBar.open('website Succefully update', 'Done', {
            duration: 2000,
          });

        })
        .catch(err => {
          this.errMsg = err;
        });
    }
  }
  ngOnInit() {
    this.websiteForm = this.createWebsiteForm();
  }

}
