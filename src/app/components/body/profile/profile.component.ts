import { AuthService } from './../../../shared/services/auth.service';
import { User } from './../../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  protected user!: User;
  protected userLoaded: boolean = false;

  /**
   * @param  {AuthService} authService
   * Service injection.
   */
  constructor(private readonly authService: AuthService) { }

  /**
   * @returns void
   * Called once, when the instance is created.
   * Get logged in user's information from auth service.
   */
  ngOnInit(): void {
    this.user = this.authService.userToCheck;
    this.userLoaded = this.user ? true : false
  }
}
