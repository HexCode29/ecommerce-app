// src/store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/interface'; // Import the Product type

interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (!existingItem) {
        state.items.push(action.payload); // Add the product to the cart
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload); // Remove the product from the cart
    },
    clearCart: (state) => {
      state.items = []; // Clear the cart
    },
  },
});

export const { addToCart, removeFromCart, clearCart  } = cartSlice.actions;
export default cartSlice.reducer;