import { ValidationService } from './../../../shared/services/validation.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  protected paymentForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly toastr: HotToastService,
    private readonly router: Router,
    private readonly formValidation: ValidationService
  ) { }

  ngOnInit(): void {
    this.createPaymentForm();
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      address: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      cardNumber: ["", Validators.required],
      expiry: ["", Validators.required],
      security: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      contract: ["", Validators.required],
      privacy: ["", Validators.required]
    });
  }

  pay() {
    if (this.paymentForm.valid) {
      this.toastr.success("Payment succeed.");
      localStorage.setItem("Paid", "paid");
      this.router.navigate(["/products"]);
    } else {
      this.toastr.error("Please check the information you entered.");
    }
  }

  getClass(formControlName: string): string {
    return this.formValidation.validate(this.paymentForm, formControlName);
  }
}
