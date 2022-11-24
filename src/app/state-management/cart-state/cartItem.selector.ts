import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartItem } from "src/app/shared/models/cartItem.model";
import { CartState } from "./cartItem.state";
/**
 * @param  {string} 'cartItems'
 * Create cart items selector.
 */
export const selectCartState = createFeatureSelector<CartState<CartItem>>('cartItems');
/**
 * @param  {State<CartItem>} state
 * Get cart from state.
 */
export const selectCart = (state: CartState<CartItem>) => state.data;
/**
 * @param  {MemoizedSelector} selectCartState
 * @param  {State<CartItem>} state
 * Create cart state selector.
 */
export const getCart = createSelector(selectCartState, (state) => {
    return state.data
})
