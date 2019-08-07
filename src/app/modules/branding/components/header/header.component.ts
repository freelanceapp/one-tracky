import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { UserModel } from '../../model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public loggedInUser: UserModel;
  public showProgressBar: boolean = false;
  constructor(private router: Router, private loginSvc: LoginService) {

    this.loggedInUser = this.loginSvc.loggedInBrandingUser;
    router.events.subscribe(
      ev => {
        if (ev instanceof NavigationStart) {
          this.showProgressBar = true;
        }
        if (ev instanceof NavigationEnd) {
          this.showProgressBar = false;
        }
      }
    );
  }

  ngOnInit() {
  }

  logOut() {
    this.loginSvc.logoutBrandingUser().then(data => {
      this.router.navigateByUrl('/login');
    }).catch(err => alert(err));
  }

}
