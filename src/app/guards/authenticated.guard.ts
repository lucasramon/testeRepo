import { UiService } from './../services/ui.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private uiService: UiService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.userIsLoggedIn()) {
      return true;
    }
    this.uiService.showInfo('Not authenticaded', 'Please login to see the details.');
    this.router.navigate(['login']);
    return false;
  }

}
