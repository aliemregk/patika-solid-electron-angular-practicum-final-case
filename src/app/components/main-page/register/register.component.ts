import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { ValidationService } from './../../../shared/services/validation.service';
import { AuthService } from './../../../shared/services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly formValidation: ValidationService,
    private readonly router: Router,
    private readonly toastr: HotToastService
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      address: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      serviceTerms: ["", Validators.required],
      privacyPolicy: ["", Validators.required]
    });
  }


  register() {
    if (this.registerForm.valid) {
      this.authService.register();
      this.router.navigate(["products"]);
    } else {
      this.toastr.error("Please check the information you entered.")
    }
  }

  getClass(formControlName: string): string {
    return this.formValidation.validate(this.registerForm, formControlName);
  }
}
