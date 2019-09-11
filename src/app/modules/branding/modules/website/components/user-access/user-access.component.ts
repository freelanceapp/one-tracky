import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserModel } from 'src/app/modules/branding/model/user.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.scss']
})
export class UserAccessComponent implements OnInit {
  displayedColumns: string[] = ['email', 'fName', 'lName', 'date', 'action'];
  dataSource: MatTableDataSource<UserModel>;
  public pubUserForm: FormGroup;
  public isAddUser: boolean = true;
  constructor(private fb: FormBuilder) { }

  public createPubUserForm() {
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
    console.log(this.pubUserForm.value)
  }
  ngOnInit() {
    this.pubUserForm = this.createPubUserForm();
  }

}
