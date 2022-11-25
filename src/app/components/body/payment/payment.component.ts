import { User } from './../../../shared/models/user.model';
import { AuthService } from './../../../shared/services/auth.service';
import { Deactivate } from './../../../shared/guards/deactivate.component';
import { paymentSucceed_message, checkInformation_message, canExit_message } from './../../../shared/constants/constants';
import { CartService } from 'src/app/shared/services/cart.service';
import { ValidationService } from './../../../shared/services/validation.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, Deactivate {

  protected paymentForm!: FormGroup;
  private isSaved: boolean = false;
  private user!: User;

  /**
   * @param  {FormBuilder} formBuilder
   * @param  {HotToastService} toastr
   * @param  {Router} router
   * @param  {ValidationService} formValidation
   * @param  {CartService} cartService
   * @param  {ProductService} productService
   * @param  {AuthService} authService
   * Service injections.
   */
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly toastr: HotToastService,
    private readonly router: Router,
    private readonly formValidation: ValidationService,
    private readonly cartService: CartService,
    private readonly productService: ProductService,
    private readonly authService: AuthService
  ) { }

  /**
   * @returns void
   * Called once, when the instance is created.
   * Get logged in user's information from auth service. 
   * Call createPaymentForm() function.
   */
  ngOnInit(): void {
    this.user = this.authService.userToCheck;
    this.createPaymentForm();
  }

  /**
   * @returns void
   * Create payment form.
   * Set logged in user's information as default values.
   */
  private createPaymentForm(): void {
    this.paymentForm = this.formBuilder.group({
      firstName: [this.user.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: [this.user.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      address: [this.user.address, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
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
   * If it is, route to products page, save cart data to local storage and clear cart. 
   * Otherwise, inform user.
   */
  protected pay(): void {
    if (this.paymentForm.valid) {
      this.isSaved = true;
      this.toastr.success(paymentSucceed_message);
      this.router.navigate(["/products"]);
      this.productService.updateProducts();
      this.cartService.clearCart();
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
    if (this.paymentForm.dirty && !this.isSaved) {
      return confirm(canExit_message)
    }
    return true;
  }
}
