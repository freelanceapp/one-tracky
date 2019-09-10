import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../../services/login/login.service';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/modules/branding/enums/user-role.enum';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public disableBrandingForm: boolean = false;
  public disablePerformanceForm: boolean = false;
  public brandingLoginForm: FormGroup;
  public performanceLoginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginSvc: LoginService, private router: Router, ) { }



  ngOnInit() {
    this.createBrandingForm();
    this.createPerformanceForm();
  }

  private createBrandingForm() {
    this.brandingLoginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      logInAs: [''],
      userType: null
    });
  }

  private createPerformanceForm() {
    this.performanceLoginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      logInAs: ['', Validators.required],

    });
  }


  public onBrandingSubmit() {
    if (this.brandingLoginForm.valid) {
      this.disableBrandingForm = true;


      if (this.brandingLoginForm.get('logInAs').value) {
        if (this.brandingLoginForm.get('logInAs').value === 'advertiser') {
          this.brandingLoginForm.controls['userType'].setValue(UserRole.AdvertiserAdmin);
        }
        if (this.brandingLoginForm.get('logInAs').value === 'publisher') {
          this.brandingLoginForm.controls['userType'].setValue(UserRole.PublisherAdmin);
        }
      } else {
        this.brandingLoginForm.controls['userType'].setValue(UserRole.Admin);
      }

      this.loginSvc.loginBrandingUser(
        this.brandingLoginForm.get('username').value,
        this.brandingLoginForm.get('password').value,
        this.brandingLoginForm.get('userType').value,

      ).then(resp => {
        if (resp) {

          this.router.navigateByUrl('/branding');
        } else {

        }
      }).catch(err => {
        alert(err);
      }).finally(() => {
        this.disableBrandingForm = false;
      });
      console.log(this.brandingLoginForm.value);
    }
  }

  public onPerformanceSubmit() {
    if (this.performanceLoginForm.valid) {
      console.log(this.performanceLoginForm.value);
    }
  }

}
