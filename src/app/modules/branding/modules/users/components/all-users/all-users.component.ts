import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/modules/branding/services/user/user.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UserModel } from 'src/app/modules/branding/model/user.model';
import { UserRole } from 'src/app/modules/branding/enums/user-role.enum';
import { LoaderService } from 'src/app/modules/branding/services/loader/loader.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  selection = new SelectionModel<UserModel>(true, []);


  displayedColumns: string[] = ['select', 'userId', 'fullName', 'email', 'createdDate', 'role'];
  dataSource: MatTableDataSource<UserModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  usersList: UserModel[] = [];
  constructor(
    private userSvc: UserService,
    private loaderSvc: LoaderService
  ) { }



  ngOnInit() {
    this.getAllUsers();
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.userId}`;
  }
  private getAllUsers() {
    this.loaderSvc.showloader = true;
    this.userSvc.getUsers()
      .then(users => {
        this.usersList = users;
        this.updateUserTable();
      })
      .catch(err => alert(err))
      .finally(() => this.loaderSvc.showloader = false);
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
    setTimeout(() => {
      this.dataSource.sort = this.sort;
    }, 1000);
  }

  public deleteUser() {

    if (!confirm('Are you sure to delete this user ?')) {
      return;
    }
    this.loaderSvc.showloader = true;
    this.userSvc.deleteUser(this.getCheckBoxId())
      .then(msg => {
        alert(msg);
        // const index = this.usersList.findIndex(usr => usr.userId === userId);
        // this.usersList.splice(index, 1);
        this.updateUserTable();
      })
      .catch(err => alert(err))
      .finally(() => { this.loaderSvc.showloader = false; this.selection.clear(); });

  }
  private getCheckBoxId(): number[] {
    const userId = this.selection.selected.map(user => user.userId);
    return userId;
  }

  public getRloeName(roleId: number): string {
    return UserRole[roleId];
  }

}
