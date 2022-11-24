import { addCartItem, removeCartItem, updateCartItem } from './cartItem.action';
import { CartItem } from './../../shared/models/cartItem.model';
import { State } from './../state';
import { createReducer, on } from '@ngrx/store';
/**
 * Define inital cart state.
 */
const initialState: State<CartItem> = {
    data: Array<CartItem>()
}
/**
 * @param  {State<CartItem>} initialState
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
 */
export const cartItemReducer = createReducer(
    initialState,
    on(addCartItem, (state, cartItem) => ({
        data: [...state.data, cartItem]
    })),
    on(removeCartItem, (state, cartItem) => {
        const cartItemToDelete = state.data.find(item => item.product === cartItem.product);
        const indexToDelete: number = state.data.indexOf(cartItemToDelete as CartItem);

        const newState: State<CartItem> = {
            data: [...state.data]
        }
        newState.data.splice(indexToDelete, 1);
        return newState;
    }),
    on(updateCartItem, (state, cartItem) => {
        const indexToUpdate: number = state.data.indexOf(cartItem);

        const newState: State<CartItem> = {
            data: [...state.data]
        }
        newState.data.splice(indexToUpdate, 1, cartItem)
        return newState;
    })
);
