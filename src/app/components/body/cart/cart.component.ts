import { CartService } from 'src/app/shared/services/cart.service';
import { CartItem } from './../../../shared/models/cartItem.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  protected cartItems!: CartItem[];

  /**
   * @param  {CartService} cartService
   * Service injections.
   */
  constructor(private readonly cartService: CartService) { }

  /**
   * @returns void
   * Called once, when the instance is created.
   * Unsubscription operation.
   */
  ngOnInit(): void {
    this.getCart();
  }

  /**
   * @returns void
   * Call getCartItems() function from cart service.
   * Assign cartItems array from cart service to local variable cartItems.
   */
  protected getCart(): void {
    this.cartService.getCartItems();
    this.cartItems = this.cartService.cartItems;
  }

  /**
   * @param  {CartItem} cartItemToRemove
   * @returns void
   * Remove given item from cart.
   */
  protected removeFromCart(cartItemToRemove: CartItem): void {
    this.cartService.removeFromCart(cartItemToRemove);
    this.getCart();
  }

  /**
   * @returns number
   * Get cart total from cart service.
   */
  protected get totalPrice(): number {
    return this.cartService.getTotalPrice();
  }
}
