import { State } from './../state';
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartItem } from "src/app/shared/models/cartItem.model";
/**
 * @param  {string} 'cartItems'
 * Create cart items selector.
 */
export const selectCartState = createFeatureSelector<State<CartItem>>('cartItems');
/**
 * @param  {State<CartItem>} state
 * Get cart from state.
 */
export const selectCart = (state: State<CartItem>) => state.data;
/**
 * @param  {MemoizedSelector} selectCartState
 * @param  {State<CartItem>} state
 * Create cart state selector.
 */
export const getCart = createSelector(selectCartState, (state) => {
    return state.data
})
