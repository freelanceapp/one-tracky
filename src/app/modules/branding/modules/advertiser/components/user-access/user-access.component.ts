import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserModel } from 'src/app/modules/branding/model/user.model';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { AdvertiserService } from 'src/app/modules/branding/services/advertiser/advertiser.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.scss']
})
export class UserAccessComponent implements OnInit {

  public avdId: number = null;
  public userId: number = null;

  displayedColumns: string[] = ['email', 'fName', 'lName', 'date', 'action'];
  dataSource: MatTableDataSource<UserModel>;
  public avdUserForm: FormGroup;
  public isAddUser: boolean = true;
  public isEdit: boolean = false;



  constructor(private fb: FormBuilder, private advertiserSvc: AdvertiserService,
    private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar, private router: Router) {
    this.avdId = parseInt(this.activatedRoute.parent.snapshot.paramMap.get('advertiserId'), 10);
    this.userId = parseInt(this.activatedRoute.snapshot.paramMap.get('userId'), 10);
    if (this.userId) {
      this.getUserById();
      this.isAddUser = false;
      this.isEdit = true;
    } else {
      this.getAllUsers();
    }

  }

  public createAvdUserForm() {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      phone: ['', Validators.required],
      userType: 2

    });
  }

  private getUserList() {
    this.isAddUser = !this.isAddUser;
    this.getAllUsers();

  }
  public getAllUsers() {
    if (this.isAddUser) {
      this.advertiserSvc.getAllUsers(this.avdId)
        .then(resp => {
          this.dataSource = new MatTableDataSource<UserModel>(resp);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }



  private addUser() {
    this.router.navigateByUrl('/branding/advertiser/edit-advertiser/' + this.avdId + '/user-access');
  }

  public getUserById() {
    this.advertiserSvc.getUserBYId(this.userId)
      .then(resp => {
        this.setUserForm(resp);
      })
      .catch(err => {
        console.log(err);
      });
  }

  private setUserForm(user: UserModel) {
    this.avdUserForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      password: user.password,
      role: user.role.toString(),
      phone: user.phone,
      userType: 2
    });
  }




  public onSubmit() {
    if (this.avdUserForm.valid) {
      if (this.userId) {
        this.advertiserSvc.editUserBYId(this.userId, this.avdUserForm.value)
          .then(resp => {
            this.snackBar.open(resp, 'done', {
              duration: 4000
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.advertiserSvc.addAdvertiserUser(this.avdId, this.avdUserForm.value)
          .then(resp => {
            this.snackBar.open(resp, 'done', {
              duration: 4000
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
  ngOnInit() {
    this.avdUserForm = this.createAvdUserForm();
  }

}
