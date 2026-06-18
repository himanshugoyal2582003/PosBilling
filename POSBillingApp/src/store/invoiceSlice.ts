import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {Invoice} from '../types';
import {loadJson, saveJson, STORAGE_KEYS} from './persistence';

type InvoiceState = {
  invoices: Invoice[];
  currentInvoiceId?: string;
};

const initialState: InvoiceState = {
  invoices: [],
};

export const loadInvoices = createAsyncThunk('invoices/load', async () => {
  return (await loadJson<Invoice[]>(STORAGE_KEYS.invoices)) ?? [];
});

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    addInvoice(state, action: PayloadAction<Invoice>) {
      state.invoices.unshift(action.payload);
      state.currentInvoiceId = action.payload.id;
    },
    setCurrentInvoice(state, action: PayloadAction<string>) {
      state.currentInvoiceId = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadInvoices.fulfilled, (state, action) => {
      state.invoices = action.payload;
    });
  },
});

export const {addInvoice, setCurrentInvoice} = invoiceSlice.actions;

export const persistInvoices = (invoices: Invoice[]) =>
  saveJson(STORAGE_KEYS.invoices, invoices);

export default invoiceSlice.reducer;
