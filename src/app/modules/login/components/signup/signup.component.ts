import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { UserSignupService } from 'src/app/services/user-signup/user-signup.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public UserSignupForm: FormGroup;
  public errMsg: string = '';
  constructor(private fb: FormBuilder, private signupService: UserSignupService, private snackbar: MatSnackBar) { }

  private createUserSignupForm() {
    this.UserSignupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      companyName: ['', Validators.required],
      password: ['', Validators.required],
      skypeId: ['', Validators.required],
      phoneNo: ['', Validators.required],
      role: ['3', Validators.required]
    });
  }

  public onBrandingSubmit() {
    if (this.UserSignupForm.valid) {
      const data = this.UserSignupForm.value as UserModel;
      const role: number = parseInt(this.UserSignupForm.controls['role'].value, 10);
      this.signupService.adduser(data, role)
        .then(res => {
          this.snackbar.open(res, 'done', {
            duration: 3000
          });
        })
        .catch(err => {
          this.snackbar.open(err, 'done', {
            duration: 3000
          });

        });
    }
  }

  ngOnInit() {
    this.createUserSignupForm();
  }

}
