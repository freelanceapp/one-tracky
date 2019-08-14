import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebsiteService } from 'src/app/modules/branding/services/website/website.service';
import { MatSnackBar } from '@angular/material';
import { LoginService } from 'src/app/services/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WebsiteModel } from 'src/app/modules/branding/model/website.model';

@Component({
  selector: 'app-add-new-website',
  templateUrl: './add-new-website.component.html',
  styleUrls: ['./add-new-website.component.scss']
})
export class AddNewWebsiteComponent implements OnInit {
  public isNewWebsite: boolean = true;
  public websiteForm: FormGroup;
  public affiliateId: number = null;
  public errMsg: string = '';



  constructor(
    private fb: FormBuilder,
    private websiteService: WebsiteService,
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.affiliateId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    if (this.affiliateId) {
      this.getWebsiteByAffiliateID();
      this.isNewWebsite = false;
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
    this.websiteService.getWebsite(this.affiliateId)
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
      if (this.affiliateId) {
        this.websiteService.editWebsite(this.affiliateId, data)
          .then(resp => {
            this.snackBar.open('website Succefully update', 'Done', {
              duration: 2000,
            });

          })
          .catch(err => {
            this.errMsg = err;
          });
      } else {
        this.websiteService.addWebsite(data)
          .then(resp => {
            this.router.navigateByUrl('/branding/website');
            this.snackBar.open('website Succefully Added', 'Done', {
              duration: 2000,
            });
          })
          .catch(err => {
            this.errMsg = err;
          });
      }
    }
  }


  ngOnInit() {
    this.websiteForm = this.createWebsiteForm();

  }

}
