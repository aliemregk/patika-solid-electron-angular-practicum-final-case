import { ValidationService } from './../../../shared/services/validation.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly toastr: HotToastService,
    private readonly formValidation: ValidationService
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login();
      this.router.navigate(["products"]);
    } else {
      this.toastr.error("Please check your email and password.", { dismissible: true })
    }
  }

  getClass(formControlName: string): string {
    return this.formValidation.validate(this.loginForm, formControlName);
  }
}
