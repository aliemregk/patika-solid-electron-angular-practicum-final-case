import { Deactivate } from './../../../shared/guards/deactivate.component';
import { paymentSucceed_message, checkInformation_message, canExit_message } from './../../../shared/constants/constants';
import { CartService } from 'src/app/shared/services/cart.service';
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
export class PaymentComponent implements OnInit, Deactivate {

  protected paymentForm!: FormGroup;

  /**
   * @param  {FormBuilder} formBuilder
   * @param  {HotToastService} toastr
   * @param  {Router} router
   * @param  {ValidationService} formValidation
   * @param  {CartService} cartService
   * Service injections.
   */
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly toastr: HotToastService,
    private readonly router: Router,
    private readonly formValidation: ValidationService,
    private readonly cartService: CartService
  ) { }

  /**
   * @returns void
   * Called once, when the instance is created.
   * Call createPaymentForm() function.
   */
  ngOnInit(): void {
    this.createPaymentForm();
  }

  /**
   * @returns void
   * Create payment form.
   */
  private createPaymentForm(): void {
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

  /**
   * @returns void
   * Checks if the payment form is valid.
   * If it is, proceed. Otherwise, inform user.
   */
  protected pay(): void {
    if (this.paymentForm.valid) {
      this.toastr.success(paymentSucceed_message);
      localStorage.setItem("Paid", "paid");
      this.router.navigate(["/products"]);
    } else {
      this.toastr.error(checkInformation_message);
    }
  }

  /**
   * @param  {string} formControlName
   * @returns string
   * Get class name with using form validation service for given form control.
   */
  protected getClass(formControlName: string): string {
    return this.formValidation.validate(this.paymentForm, formControlName);
  }

  /**
   * @returns number
   * Get cart total from cart service.
   */
  protected get totalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  /**
   * @returns boolean
   * Ask user before exiting page to prevent data loss.
   */
  public canExit(): boolean {
    if (this.paymentForm.dirty) {
      if (confirm(canExit_message)) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}
