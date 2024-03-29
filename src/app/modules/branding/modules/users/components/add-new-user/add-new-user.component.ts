import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserRole } from 'src/app/modules/branding/enums/user-role.enum';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/modules/branding/services/user/user.service';
import { UserModel } from 'src/app/modules/branding/model/user.model';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {


  public isNewUser: boolean = true;
  public userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userSvc: UserService
  ) {

  }

  ngOnInit() {
    this.createUserForm().then(() => {
      const userId: string = this.activatedRoute.snapshot.paramMap.get('id');
      if (userId) {
        this.isNewUser = false;
        const passwordControl = this.userForm.get('password');
        passwordControl.setValidators(null);
        passwordControl.updateValueAndValidity();
        this.getUserById(parseInt(userId, 10));
      }
    });
  }

  private getUserById(userId: number) {
    if (userId) {
      this.userSvc.getUsers(userId).then(user => {
        this.patchUserForm(user);
      });
    }
  }

  private createUserForm(): Promise<boolean> {
    this.userForm = this.fb.group({
      userId: [''],
      password: ['', [Validators.required]],
      userName: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      role: [UserRole.Advertiser, [Validators.required]],
      skype: [''],
      company: [''],
      phone: ['', [Validators.required]],
    });
    return Promise.resolve(true);
  }

  private patchUserForm(user: UserModel) {
    this.userForm.patchValue({
      userId: user.userId,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      skype: user.skype,
      company: user.company,
      phone: user.phone,
    });
  }

  public onSubmit() {
    console.log(this.userForm.value);
    if (this.userForm.valid && this.isNewUser) {
      this.userSvc.addNewUser(this.userForm.value as UserModel).then(msg => alert(msg)).catch(err => alert(err));
    } else {
      this.userSvc.editUser(this.userForm.value as UserModel).then(msg => alert(msg)).catch(err => alert(err));
    }
  }

}
