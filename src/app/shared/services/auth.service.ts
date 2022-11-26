import { welcome_message, email_message, password_message, loggedOut_message, signedUp_message } from './../constants/constants';
import { RegisterModel } from './../models/register.model';
import { UserService } from './user.service';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import { LoginModel } from './../models/login.model';
import { User } from 'src/app/shared/models/user.model';
import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn: boolean = false;
  public userToCheck!: User;
  private subscription!: Subscription;

  /**
   * @param  {UserService} userService
   * @param  {HotToastService} toastr
   * @param  {Router} router
   * Service injections.
   */
  constructor(
    private readonly userService: UserService,
    private readonly toastr: HotToastService,
    private readonly router: Router
  ) { }

  /**
   * @param  {LoginModel} loginModel
   * @returns Promise<void>
   * Call getUserByEmail() function to get user data from json-server. Assign return value to a local variable.
   * If user exists call checkPassword() function, otherwise notify user.
   */
  public async signIn(loginModel: LoginModel): Promise<void> {
    this.userToCheck = Object.values(await firstValueFrom(this.getUserByEmail(loginModel.email)))[0];
    if (this.userToCheck) {
      this.checkPassword(loginModel);
    } else {
      this.toastr.error(email_message);
    }
  }

  /**
   * @param  {string} email
   * @returns Observable<User>
   * Use user service to get data for given email. 
   */
  private getUserByEmail(email: string): Observable<User> {
    return this.userService.getUserByEmail(email);
  }

  /**
   * @param  {LoginModel} loginModel
   * @returns void
   * Check whether the input data and json-server data are same.
   * If so call login function. Otherwise, notify user to check password input.
   */
  private checkPassword(loginModel: LoginModel): void {
    if (this.userToCheck.password === loginModel.password) {
      this.login(loginModel);
    } else {
      this.toastr.error(password_message);
    }
  }

  /**
   * @param  {LoginModel} loginModel
   * @returns void
   * Save login information to local storage. Then, navigate to products page and greet user.
   */
  private login(loginModel: LoginModel): void {
    this.isLoggedIn = true;
    this.router.navigate(["products"]);
    this.toastr.success(welcome_message + loginModel.email + "!");
    localStorage.setItem("logged in", loginModel.email);
  }

  /**
   * @returns void
   * Logout and clear login information from local storage.
   */
  public logout(): void {
    localStorage.clear();
    this.isLoggedIn = false;
    this.toastr.info(loggedOut_message);
  }

  /**
   * @param  {RegisterModel} registerModel
   * Create new user and send it to user service to save.
   * Save register information to local storage. Then, navigate to products page and greet user.
   */
  public register(registerModel: RegisterModel) {
    const newUser: User = {
      id: 0,
      firstName: registerModel.firstName,
      lastName: registerModel.lastName,
      address: registerModel.address,
      email: registerModel.email,
      password: registerModel.password
    }
    this.subscription = this.userService.addNewUser(newUser).subscribe();
    localStorage.setItem("registered", registerModel.email);
    this.isLoggedIn = true;
    this.router.navigate(["products"]);
    this.toastr.success(signedUp_message + welcome_message + registerModel.email + "!");
  }

  /**
   * @returns void
   * Called once, before the instance is destroyed.
   * Unsubscription operation.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
