import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserModel } from 'src/app/modules/branding/model/user.model';
import { MatTableDataSource } from '@angular/material';
import { WebsiteService } from 'src/app/modules/branding/services/website/website.service';
import { ActivatedRoute } from '@angular/router';

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
  public websiteId: number = null;
  constructor(private fb: FormBuilder, private websiteSvc: WebsiteService, private activatedRoute: ActivatedRoute) {
    this.websiteId = parseInt(this.activatedRoute.parent.snapshot.paramMap.get('websiteId'), 10);
    this.getAllUsers();
  }

  public createPubUserForm() {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      phoneNo: ['', Validators.required],
      userType: 3
    });
  }

  private getUserList() {
    this.isAddUser = !this.isAddUser;
    this.getAllUsers();
  }



  public getAllUsers() {
    if (this.isAddUser) {
      this.websiteSvc.getAllUsers(this.websiteId)
        .then(resp => {
          this.dataSource = new MatTableDataSource<UserModel>(resp)
        })
        .catch(err => {
          console.log(err);
        });
    }
  }



  public onSubmit() {
    if (this.pubUserForm.valid) {
      this.websiteSvc.addPublisherUser(this.websiteId, this.pubUserForm.value)
        .then(resp => {
          console.log(resp);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }


  ngOnInit() {
    this.pubUserForm = this.createPubUserForm();
    this.getAllUsers()
  }

}
