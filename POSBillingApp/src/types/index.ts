export type Product = {
  id: string;
  name: string;
  price: number;
};

export type CartItem = Product & {
  quantity: number;
};

export type StoreSettings = {
  storeName: string;
  storeAddress: string;
  phoneNumber: string;
};

export type BillingSettings = {
  gstEnabled: boolean;
  gstPercentage: number;
  currencySymbol: string;
};

export type ReceiptSettings = {
  footerMessage: string;
  autoPrint: boolean;
};

export type SettingsState = {
  store: StoreSettings;
  billing: BillingSettings;
  receipt: ReceiptSettings;
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  createdAt: string;
  items: CartItem[];
  discount: number;
  subtotal: number;
  tax: number;
  total: number;
  settingsSnapshot: SettingsState;
};
