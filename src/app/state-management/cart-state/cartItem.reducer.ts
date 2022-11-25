import { addCartItem, clearCart, removeCartItem, updateCartItem } from './cartItem.action';
import { CartItem } from './../../shared/models/cartItem.model';
import { createReducer, on } from '@ngrx/store';
import { CartState, initialState } from './cartItem.state';

/**
 * @param  {CartState<CartItem>} initialState
 * Create reducer for add, remove and update actions.
 * @returns state after actions.
 * @param  {Action} addCartItem
 * Add action is used for adding new items to state.
 * @param  {Action} removeCartItem
 * Remove action is used for removing items from state.
 * Find item in current state and find its index. Then create a new state and splice it.
 * @param  {Action} updateCartItem
 * Update action is used for updating items in state.
 * Find item in current state. Then create a new state and update item.
 * @param  {Action} clearCart
 * Set state to initial state.
 */
export const cartItemReducer = createReducer(
    initialState,
    on(addCartItem, (state, cartItem) => ({
        data: [...state.data, cartItem]
    })),
    on(removeCartItem, (state, cartItem) => {
        const cartItemToDelete = state.data.find(item => item.product === cartItem.product);
        const indexToDelete: number = state.data.indexOf(cartItemToDelete as CartItem);

        const newState: CartState<CartItem> = {
            data: [...state.data]
        }
        newState.data.splice(indexToDelete, 1);
        return newState;
    }),
    on(updateCartItem, (state, cartItem) => {
        const indexToUpdate: number = state.data.indexOf(cartItem);

        const newState: CartState<CartItem> = {
            data: [...state.data]
        }
        newState.data.splice(indexToUpdate, 1, cartItem)
        return newState;
    }),
    on(clearCart, () => ({
        data: [...initialState.data]
    })),
);
