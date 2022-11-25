import { loginWarning_message } from './../constants/constants';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  /**
   * @param  {AuthService} authService
   * @param  {HotToastService} toastr
   * @param  {Router} router
   * Service injections.
   */
  constructor(
    private readonly authService: AuthService,
    private readonly toastr: HotToastService,
    private readonly router: Router
  ) { }


  /**
   * @returns boolean
   * Check if user is logged in. If so return true.
   * Otherwise, return false, navigate to main page and inform user.
   */
  public canActivate(): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      this.router.navigate([""]);
      this.toastr.warning(loginWarning_message);
      return false;
    }
  }

}
