import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private loginSvc: LoginService, private router: Router) {

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean {
    if (this.loginSvc.isBrandingUserLoggedIn) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.loginSvc.isBrandingUserLoggedIn) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }



}
