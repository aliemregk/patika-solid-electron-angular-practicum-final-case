import { Subscription } from 'rxjs';
import { User } from './../../../shared/models/user.model';
import { UserService } from './../../../shared/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { dataError_message } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  protected user!: User;
  protected userLoaded: boolean = false;
  private email: string = "";
  private subscription!: Subscription;

  constructor(
    private readonly userService: UserService,
    private readonly toastr: HotToastService
  ) { }

  ngOnInit(): void {
    this.email = localStorage.getItem("registered") || localStorage.getItem("logged in")!
    this.getUser();
  }

  getUser() {
    this.subscription = this.userService.getUserByEmail(this.email).subscribe({
      next: (data) => {
        this.user = Object.values(data)[0];
        this.userLoaded = true;
      },
      error: () => {
        this.toastr.error(dataError_message);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
