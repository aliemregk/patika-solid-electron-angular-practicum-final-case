import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;

  constructor(private readonly toastr: HotToastService) { }

  login() {
    localStorage.setItem("logged", "user");
    this.isLoggedIn = true;
    this.toastr.success("Logged in successfully!");
  }

  logout() {
    localStorage.removeItem("logged");
    this.isLoggedIn = false;
    this.toastr.info("Logged out!");
  }

  register() {
    localStorage.setItem("logged", "user");
    this.isLoggedIn = true;
    this.toastr.success("Signed up successfully!");
  }
}
