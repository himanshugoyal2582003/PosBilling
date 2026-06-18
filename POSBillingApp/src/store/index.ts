import {configureStore, createListenerMiddleware} from '@reduxjs/toolkit';
import billingReducer from './billingSlice';
import invoiceReducer, {persistInvoices} from './invoiceSlice';
import settingsReducer, {persistSettings} from './settingsSlice';

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    billing: billingReducer,
    settings: settingsReducer,
    invoices: invoiceReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

listenerMiddleware.startListening({
  predicate: action => action.type.startsWith('settings/'),
  effect: async (_action, api) => {
    const state = api.getState() as RootState;
    await persistSettings(state.settings);
  },
});

listenerMiddleware.startListening({
  predicate: action => action.type === 'invoices/addInvoice',
  effect: async (_action, api) => {
    const state = api.getState() as RootState;
    await persistInvoices(state.invoices.invoices);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
