import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResetPasswordService } from 'src/app/services/reset-password/reset-password.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  /** Reset password form */
  public rspForm: FormGroup;
  public errMsg: string = ''

  constructor(private resetPasswordSrv: ResetPasswordService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createResetPasswordForm();
  }


  private createResetPasswordForm() {
    this.rspForm = new FormGroup({
      logInAs: new FormControl('3'),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  public onSubmit() {
    if (this.rspForm.valid) {
      const email = this.rspForm.controls['email'].value;
      const role = this.rspForm.controls['logInAs'].value;
      this.resetPasswordSrv.resetPassword(email, role)
        .then(res => {
          if (res) {
            this.snackBar.open('Password Sent successfully to your email address ', 'done', {
              duration: 3000
            });
          } else {
            this.snackBar.open('Email did not match!', 'done', {
              duration: 3000
            });
          }
        })
        .catch(err => {
          this.errMsg = err;
        });
    }
  }

}
