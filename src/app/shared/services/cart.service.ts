import { addToCart_message, removeFromCart_message, storeError_message } from './../constants/constants';
import { Subscription } from 'rxjs';
import { Product } from './../models/product.model';
import { CartItem } from './../models/cartItem.model';
import { getCart } from './../../state-management/cart-state/cartItem.selector';
import { Store } from '@ngrx/store';
import { Injectable, OnDestroy } from '@angular/core';
import { addCartItem, clearCart, removeCartItem, updateCartItem } from 'src/app/state-management/cart-state/cartItem.action';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {

  public cartItems: CartItem[] = [];
  private cartItem!: CartItem;
  private subscription!: Subscription;

  /**
   * @param  {Store<CartItem[]>} store
   * @param  {HotToastService} toastr
   * Service and ngrx store injections.
   */
  constructor(
    private readonly store: Store<CartItem[]>,
    private readonly toastr: HotToastService
  ) { }

  /**
   * @returns void
   * Get cart items from state and subscribe it.
   * Assign state data to cartItems variable for further use.
   * Use a subscription for unsubscribe operation.
   */
  public getCartItems(): void {
    this.subscription = this.store.select(getCart).subscribe({
      next: (data) => {
        this.cartItems = data;
      },
      error: () => {
        this.toastr.error(storeError_message);
      }
    });
  }

  /**
   * @param  {Product} productToAddCart
   * @returns void
   * Add or update cart items.
   */
  public addProductToCart(productToAddCart: Product): void {
    this.toastr.success(productToAddCart.name + addToCart_message);

    if (this.checkIfItemExistsInCart(productToAddCart)) {
      this.updateCart({ product: this.cartItem.product, quantity: this.cartItem.quantity + 1 })
    } else {
      this.addToCart({ product: productToAddCart, quantity: 1 } as CartItem);
    }
  }

  /**
   * @param  {Product} productToAddCart
   * @returns boolean
   * Check whether the item exists in cart.
   */
  private checkIfItemExistsInCart(productToAddCart: Product): boolean {
    this.getCartItems();
    this.cartItem = this.cartItems.filter(item => item.product.id === productToAddCart.id)[0];
    return this.cartItem != undefined ? true : false
  }

  /**
   * @param  {CartItem} newItem
   * @returns void
   * Add an item to state.
   */
  private addToCart(newItem: CartItem): void {
    this.store.dispatch(addCartItem(newItem));
  }

  /**
   * @param  {CartItem} itemToRemove
   * @returns void
   * Remove an item from state.
   */
  public removeFromCart(itemToRemove: CartItem): void {
    this.toastr.warning(itemToRemove.product.name + removeFromCart_message);
    this.store.dispatch(removeCartItem(itemToRemove));
  }

  /**
   * @param  {CartItem} itemToUpdate
   * @returns void
   * Update an item in state.
   */
  private updateCart(itemToUpdate: CartItem): void {
    this.store.dispatch(updateCartItem(itemToUpdate));
  }

  /**
   * @param  {CartItem} itemToUpdate
   * @returns void
   * Save cart to local storage and clear cart state.
   */
  public clearCart(): void {
    localStorage.setItem("Cart", JSON.stringify(this.cartItems));
    this.store.dispatch(clearCart());
  }

  /**
     * @returns number
     * Calculate total price of cart and return this amount.
     */
  public getTotalPrice(): number {
    let totalPrice: number = 0;
    this.cartItems.forEach(item => {
      totalPrice += item.quantity * item.product.unitPrice
    });
    return totalPrice;
  }

  /**
   * @returns void
   * Called once, before the instance is destroyed.
   * Unsubscription operation.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

