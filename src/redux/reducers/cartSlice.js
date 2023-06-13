import { createSlice } from '@reduxjs/toolkit';
// --------------------------------------------------------------------

const initialState = {
    items: [],
    totalQuantity: 0,
    total :0,

}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;

            const existingItem = state.items.find(item => item._id === newItem._id);

            state.totalQuantity++;

            if (newItem.countInStock >= 1) {

                if (!existingItem) {
                    state.items.push({
                        _id: newItem._id,
                        price: newItem.price,
                        quantity: 1,
                        totalPrice: newItem.price,
                        name: newItem.name,
                        image: newItem.image,
                        brand: newItem.brand,
                        countInStock: newItem.countInStock,


                    })

                    state.total = state.total + newItem.price;

                } else {
                    existingItem.quantity = existingItem.quantity + 1;
                    existingItem.totalPrice = existingItem.totalPrice + newItem.price;
                    state.total = state.total + newItem.price;

                }
            }
        },

        removeItem(state, action) {            
            const item = action.payload;
            const existingItem = state.items.find(piece => piece._id === item._id);
            state.totalQuantity--;
            state.total = state.total - item.price;


            if (existingItem?.quantity >= 0) {

                if (existingItem?.quantity === 1) {
                    existingItem.quantity= existingItem.quantity - 1;
                    state.items = state.items.filter(item => item.quantity > 0);

                    
                } else {
                    existingItem.quantity= existingItem.quantity - 1;
                    existingItem.totalPrice = existingItem.totalPrice - existingItem.price;


                }
            }
        },

        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.total = 0;

        }
    }
})

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export const selectCartItems = state => state.cart.items;
export const selectTotal = state => state.cart.total;
export const selectTotalQuantity = state => state.cart.totalQuantity;