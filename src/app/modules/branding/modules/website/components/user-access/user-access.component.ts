import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.scss']
})
export class UserAccessComponent implements OnInit {
  public pubExecutiveForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  public createPubExecutiveForm() {
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
    console.log(this.pubExecutiveForm.value)
  }
  ngOnInit() {
    this.pubExecutiveForm = this.createPubExecutiveForm();
  }

}
