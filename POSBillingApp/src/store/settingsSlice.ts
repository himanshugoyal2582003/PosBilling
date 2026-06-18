import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {BillingSettings, ReceiptSettings, SettingsState, StoreSettings} from '../types';
import {loadJson, saveJson, STORAGE_KEYS} from './persistence';

export const defaultSettings: SettingsState = {
  store: {
    storeName: 'My POS Store',
    storeAddress: 'Main Market Road',
    phoneNumber: '+91 98765 43210',
  },
  billing: {
    gstEnabled: true,
    gstPercentage: 5,
    currencySymbol: '₹',
  },
  receipt: {
    footerMessage: 'Thank You',
    autoPrint: false,
  },
};

export const loadSettings = createAsyncThunk('settings/load', async () => {
  return (await loadJson<SettingsState>(STORAGE_KEYS.settings)) ?? defaultSettings;
});

const settingsSlice = createSlice({
  name: 'settings',
  initialState: defaultSettings,
  reducers: {
    updateStoreSettings(state, action: PayloadAction<Partial<StoreSettings>>) {
      state.store = {...state.store, ...action.payload};
    },
    updateBillingSettings(state, action: PayloadAction<Partial<BillingSettings>>) {
      state.billing = {...state.billing, ...action.payload};
    },
    updateReceiptSettings(state, action: PayloadAction<Partial<ReceiptSettings>>) {
      state.receipt = {...state.receipt, ...action.payload};
    },
  },
  extraReducers: builder => {
    builder.addCase(loadSettings.fulfilled, (_state, action) => action.payload);
  },
});

export const {updateStoreSettings, updateBillingSettings, updateReceiptSettings} =
  settingsSlice.actions;

export const persistSettings = (settings: SettingsState) =>
  saveJson(STORAGE_KEYS.settings, settings);

export default settingsSlice.reducer;
