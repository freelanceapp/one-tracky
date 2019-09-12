import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserModel } from 'src/app/modules/branding/model/user.model';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { WebsiteService } from 'src/app/modules/branding/services/website/website.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  public userId: number = null;
  public isEdit: boolean = false;
  constructor(private fb: FormBuilder, private websiteSvc: WebsiteService,
    private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar, private router: Router) {
    this.websiteId = parseInt(this.activatedRoute.parent.snapshot.paramMap.get('websiteId'), 10);
    this.userId = parseInt(this.activatedRoute.snapshot.paramMap.get('userId'), 10);
    if (this.userId) {
      this.isAddUser = false;
      this.isEdit = true;
      this.getUserById();
    } else {
      this.getAllUsers();
    }
  }

  public createPubUserForm() {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      phone: ['', Validators.required],
      userType: 3
    });
  }

  private getUserList() {
    this.isAddUser = !this.isAddUser;
    this.getAllUsers();
  }
  private addUser() {
    this.router.navigateByUrl('/branding/website/edit-website/' + this.websiteId + '/user-access');
  }

  public getUserById() {
    this.websiteSvc.getUserBYId(this.userId)
      .then(resp => {
        this.setUserForm(resp);
      })
      .catch(err => {
        console.log(err);
      });
  }

 
  public getAllUsers() {
    if (this.isAddUser) {
      this.websiteSvc.getAllUsers(this.websiteId)
        .then(resp => {
          this.dataSource = new MatTableDataSource<UserModel>(resp);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }



  public onSubmit() {
    if (this.pubUserForm.valid) {
      if (this.userId) {
        this.websiteSvc.editUserBYId(this.userId, this.pubUserForm.value)
          .then(resp => {
            this.snackBar.open(resp, 'done');
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.websiteSvc.addPublisherUser(this.websiteId, this.pubUserForm.value)
          .then(resp => {
            this.snackBar.open(resp, 'done');
          })
          .catch(err => {
            console.log(err);
          });
      }




    }
  }


  ngOnInit() {
    this.pubUserForm = this.createPubUserForm();
    this.getAllUsers()
  }

}
