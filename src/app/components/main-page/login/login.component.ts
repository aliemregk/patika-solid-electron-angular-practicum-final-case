import { ValidationService } from './../../../shared/services/validation.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginError_message } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  protected loginForm!: FormGroup;

  /**
   * @param  {FormBuilder} formBuilder
   * @param  {AuthService} authService
   * @param  {HotToastService} toastr
   * @param  {ValidationService} formValidation
   * Service injections.
   */
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly toastr: HotToastService,
    private readonly formValidation: ValidationService
  ) { }

  /**
   * @returns void
   * Called once, when the instance is created.
   * Call createLoginForm() function.
   */
  ngOnInit(): void {
    this.createLoginForm();
  }

  /**
   * @returns void
   * Create login form.
   */
  private createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * @returns void
   * Check the login form. If valid, call signIn() function from auth service.
   * Otherwise notify user to check input values.
   */
  protected login(): void {
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value);
    } else {
      this.toastr.error(loginError_message, { dismissible: true })
    }
  }

  /**
   * @param  {string} formControlName
   * @returns string
   * Get class name with using form validation service for given form control.
   */
  protected getClass(formControlName: string): string {
    return this.formValidation.validate(this.loginForm, formControlName);
  }
}
