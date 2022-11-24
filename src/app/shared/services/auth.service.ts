import { Observable, firstValueFrom } from 'rxjs';
import { LoginModel } from './../models/login.model';
import { User } from 'src/app/shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { API_URL } from '../constants/constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn: boolean = false;
  private apiUrl = API_URL + "/users";
  private userToCheck!: User;

  /**
   * @param  {HttpClient} httpClient
   * @param  {HotToastService} toastr
   * @param  {Router} router
   * Service injections.
   */
  constructor(
    private readonly httpClient: HttpClient,
    private readonly toastr: HotToastService,
    private readonly router: Router
  ) { }

  /**
   * @param  {LoginModel} loginModel
   * @returns void
   * Get email and password from user and call startLoginOperation() function.
   */
  public login(loginModel: LoginModel): void {
    this.startLoginOperation(loginModel);
  }

  /**
   * @param  {LoginModel} loginModel
   * @returns void
   * Call getUserByEmail() function to get user from api.
   * Assign return value to a local variable.
   * If user exists call checkPassword() function, otherwise notify user.
   */
  private async startLoginOperation(loginModel: LoginModel): Promise<void> {
    this.userToCheck = Object.values(await firstValueFrom(this.getUserByEmail(loginModel.email)))[0];
    if (this.userToCheck) {
      this.checkPassword(loginModel);
    } else {
      this.toastr.error("Email not found!");
    }
  }

  /**
   * @param  {string} email
   * @returns Observable<User>
   * Get request for a single user according to given email. 
   */
  private getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(this.apiUrl + "?email=" + email);
  }

  /**
   * @param  {LoginModel} loginModel
   * @returns void
   * Check whether the input data and api data are same.
   * If so set a local storage item then navigate to products page and greet user.
   * Otherwise, notify user to check password input.
   */
  private checkPassword(loginModel: LoginModel): void {
    if (this.userToCheck.password === loginModel.password) {
      this.isLoggedIn = true;
      this.router.navigate(["products"]);
      this.toastr.success("Welcome, " + loginModel.email + "!");
      localStorage.setItem("logged user", loginModel.email);
    } else {
      this.toastr.error("Wrong password!");
    }
  }

  /**
   * @returns void
   * Logout and clear login information from local storage.
   */
  public logout(): void {
    localStorage.removeItem("logged user");
    this.isLoggedIn = false;
    this.toastr.info("Logged out.");
  }


  register() {
    localStorage.setItem("logged", "user");
    this.isLoggedIn = true;
    this.toastr.success("Signed up successfully!");
  }

}
