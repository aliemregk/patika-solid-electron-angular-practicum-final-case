import { Router } from '@angular/router';
import { AuthService } from './../../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /**
   * @param  {AuthService} authService
   * @param  {Router} router
   * Service injections.
   */
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }
  /**
   * @returns void
   * Use auth service for logout operation and navigate to main page.
   */
  protected logout(): void {
    this.authService.logout();
    this.router.navigate([""]);
  }
}
