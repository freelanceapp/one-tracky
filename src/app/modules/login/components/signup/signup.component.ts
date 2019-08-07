import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  public brandingLoginForm: FormGroup;


  constructor(private fb: FormBuilder) { }



  ngOnInit() {
    this.createBrandingForm();
  }
  private createBrandingForm() {
    this.brandingLoginForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      companyName: ['', Validators.required],
      password: ['', Validators.required],
      skypeId: ['', Validators.required],
      phoneNo: ['', Validators.required],
      signUpAs: ['', Validators.required]
    });
  }

  public onBrandingSubmit() {
    if (this.brandingLoginForm.valid) {
      console.log(this.brandingLoginForm.value);
    }
  }

}
