import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../../services/login/login.service';
import { Router } from '@angular/router';


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

  constructor(private fb: FormBuilder, private loginSvc: LoginService, private router: Router) { }



  ngOnInit() {
    this.createBrandingForm();
    this.createPerformanceForm();
  }

  private createBrandingForm() {
    this.brandingLoginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      logInAs: ['']
    });
  }

  private createPerformanceForm() {
    this.performanceLoginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      logInAs: ['', Validators.required]
    });
  }


  public onBrandingSubmit() {
    if (this.brandingLoginForm.valid) {
      this.disableBrandingForm = true;
      this.loginSvc.loginBrandingUser(
        this.brandingLoginForm.get('username').value,
        this.brandingLoginForm.get('password').value,
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
    }
  }

  public onPerformanceSubmit() {
    if (this.performanceLoginForm.valid) {
      console.log(this.performanceLoginForm.value);
    }
  }

}
