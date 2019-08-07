import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/modules/branding/services/user/user.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UserModel } from 'src/app/modules/branding/model/user.model';
import { UserRole } from 'src/app/modules/branding/enums/user-role.enum';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {


  displayedColumns: string[] = ['userId', 'fullName', 'email', 'createdDate', 'role', 'action'];
  dataSource: MatTableDataSource<UserModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  usersList: UserModel[] = [];
  constructor(
    private userSvc: UserService
  ) { }



  ngOnInit() {
    this.getAllUsers();
  }

  private getAllUsers() {
    this.userSvc.getUsers().then(users => {
      console.log(users);
      this.usersList = users;
      this.updateUserTable();
    }).catch(err => alert(err));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private updateUserTable() {
    this.dataSource = new MatTableDataSource(this.usersList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public deleteUser(userId: number) {

    if (!confirm('Are you sure to delete this user ?')) {
      return;
    }

    this.userSvc.deleteUser(userId).then(msg => {
      alert(msg);
      const index = this.usersList.findIndex(usr => usr.userId === userId);
      this.usersList.splice(index, 1);
      this.updateUserTable();
    }).catch(err => alert(err));
  }


  public getRloeName(roleId: number): string {
    return UserRole[roleId];
  }

}
