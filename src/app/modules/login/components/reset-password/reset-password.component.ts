import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  /** Reset password form */
  public rspForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.createResetPasswordForm();
  }


  private createResetPasswordForm() {
    this.rspForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  public onSubmit() {
    if (this.rspForm.valid) {
      console.log(this.rspForm.value);
    }
  }

}
