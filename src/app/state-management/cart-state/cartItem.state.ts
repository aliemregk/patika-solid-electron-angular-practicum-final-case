import { CartItem } from "src/app/shared/models/cartItem.model";

export interface CartState<CartItem> {
    data: CartItem[];
}

/**
 * Define inital cart state.
 */
export const initialState: CartState<CartItem> = {
    data: Array<CartItem>()
}