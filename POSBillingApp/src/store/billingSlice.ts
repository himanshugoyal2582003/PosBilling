import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {CartItem, Product} from '../types';

type BillingState = {
  cart: CartItem[];
  discount: number;
};

const initialState: BillingState = {
  cart: [],
  discount: 0,
};

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      const existing = state.cart.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({...action.payload, quantity: 1});
      }
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.cart.find(cartItem => cartItem.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.cart.find(cartItem => cartItem.id === action.payload);
      if (!item) {
        return;
      }
      if (item.quantity === 1) {
        state.cart = state.cart.filter(cartItem => cartItem.id !== action.payload);
      } else {
        item.quantity -= 1;
      }
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    setDiscount(state, action: PayloadAction<number>) {
      state.discount = Math.max(0, action.payload || 0);
    },
    clearBill(state) {
      state.cart = [];
      state.discount = 0;
    },
  },
});

export const {
  addProduct,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
  setDiscount,
  clearBill,
} = billingSlice.actions;

export default billingSlice.reducer;
