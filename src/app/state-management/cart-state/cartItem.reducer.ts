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
 * Returns new state.
 * @param  {Action} addCartItem
 * add action is used for adding new items to state.
 * @param  {Action} removeCartItem
 * remove action is used for removing items from state.
 * @param  {Action} updateCartItem
 * update action is used for updating items in state.
 */
export const cartItemReducer = createReducer(
    initialState,
    on(addCartItem, (state, cartItem) => ({
        data: [...state.data, cartItem]
    })),
    on(removeCartItem, (state, cartItem) => {
        const indexToDelete: number = state.data.indexOf(cartItem);
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
        newState.data.splice(indexToUpdate, 1);
        newState.data.splice(indexToUpdate, 0, cartItem)
        return newState;
    })
);
