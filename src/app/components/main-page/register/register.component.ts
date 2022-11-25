import { checkInformation_message } from './../../../shared/constants/constants';
import { HotToastService } from '@ngneat/hot-toast';
import { ValidationService } from './../../../shared/services/validation.service';
import { AuthService } from './../../../shared/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  protected registerForm!: FormGroup;

  /**
   * @param  {FormBuilder} formBuilder
   * @param  {AuthService} authService
   * @param  {ValidationService} formValidation
   * @param  {HotToastService} toastr
   * Service injections.
   */
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly formValidation: ValidationService,
    private readonly toastr: HotToastService
  ) { }

  /**
   * @returns void
   * Called once, when the instance is created.
   * Call createRegisterForm() function.
   */
  ngOnInit(): void {
    this.createRegisterForm();
  }

  /**
   * @returns void
   * Create register form.
   */
  private createRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      userDetails: this.formBuilder.group({
        firstName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        lastName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        address: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
      }),
      serviceTerms: ["", Validators.required],
      privacyPolicy: ["", Validators.required]
    });
  }

  /**
   * @returns void
   * Check the register form. If valid, call register() function from auth service.
   * Otherwise notify user to check input values.
   */
  protected register(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.controls['userDetails'].value);
    } else {
      this.toastr.error(checkInformation_message, { dismissible: true })
    }
  }

  /**
   * @param  {string} formControlName
   * @returns string
   * Get class name with using form validation service for given form control.
   */
  protected getClass(formControlName: string): string {
    return this.formValidation.validate(this.registerForm, formControlName);
  }
}
