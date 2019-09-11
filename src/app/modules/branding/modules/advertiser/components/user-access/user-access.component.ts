import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.scss']
})
export class UserAccessComponent implements OnInit {

  public avdUserForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  public createAvdUserForm() {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      phoneNo: ['', Validators.required]
    });
  }


  public onSubmit() {
    console.log(this.avdUserForm.value)
  }
  ngOnInit() {
    this.avdUserForm = this.createAvdUserForm();
  }

}
