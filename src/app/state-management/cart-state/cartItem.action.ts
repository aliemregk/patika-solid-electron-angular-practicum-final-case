import { createAction, props } from "@ngrx/store";
import { CartItem } from "src/app/shared/models/cartItem.model";
/**
 * Define action types.
 */
export const ADD_CART_ITEM = "[ADD CART ITEM] CartItems";
export const REMOVE_CART_ITEM = "[REMOVE CART ITEM] CartItems";
export const UPDATE_CART_ITEM = "[UPDATE CART ITEM] CartItems";
export const CLEAR_CART = "[CLEAR_CART] CartItems";
/**
 * Create actions using ngrx's createAction() function.
 */
export const addCartItem = createAction(ADD_CART_ITEM, props<CartItem>());
export const removeCartItem = createAction(REMOVE_CART_ITEM, props<CartItem>());
export const updateCartItem = createAction(UPDATE_CART_ITEM, props<CartItem>());
export const clearCart = createAction(CLEAR_CART);