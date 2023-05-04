import {  createSlice } from '@reduxjs/toolkit';
// --------------------------------------------------------------------

const initialState = {
    items : [],
    totalQuantity: 0,

}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addItem(state, action) {
        const newItem = action.payload;
        console.log('s', state.items);
        console.log('new', newItem);

        const existingItem = state.items.find(item => item._id === newItem._id);
        
        state.totalQuantity++;

        console.log(existingItem>=1);
       
        if(newItem.countInStock >= 1){
            
            if(!existingItem ) {
                state.items.push({
                    _id: newItem._id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name,
                    image: newItem.image,
                    brand: newItem.brand,
                    qty: newItem.countInStock,
                    

                })
            }else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
    }
      },

      removeItem(state, action) {
        const id = action.payload;
        const existingItem = state.items.find(item => item.id === id);
        state.totalQuantity++;

        if(existingItem.quantity === 1) {
            state.items = state.items.filter(item => item.id !== id);

        } else {
            existingItem.quantity--;
            existingItem.totalPrice = existingItem.totalPrice - existingItem.price;

        }
    },

    clearCart(state) {
        state.items = [];
        state.totalQuantity = 0;

    }
    }
})

export const { addItem, removeItem, clearCart } = cartSlice.actions;

// export default cartSlice.reducer;