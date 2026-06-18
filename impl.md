I read `0.pdf`. Here is the **implementation-only plan** to start the first React Native POS Billing app and prepare it for APK download/build.

**Implementation Plan**

1. **Create React Native App**
   - Initialize React Native project with TypeScript.
   - App name: `POSBillingApp`.
   - Install required packages:
     - `@reduxjs/toolkit`
     - `react-redux`
     - `@react-navigation/native`
     - React Navigation stack/bottom tabs
     - `@react-native-async-storage/async-storage`

2. **Set Up Project Structure**

```txt
src/
├── screens/
│   ├── BillingScreen.tsx
│   ├── ReceiptPreviewScreen.tsx
│   ├── BillingHistoryScreen.tsx
│   └── SettingsScreen.tsx
├── components/
├── navigation/
├── store/
│   ├── index.ts
│   ├── billingSlice.ts
│   ├── settingsSlice.ts
│   └── invoiceSlice.ts
├── services/
├── hooks/
├── types/
├── utils/
└── assets/
```

3. **Configure Redux Store**
   - Create `billingSlice` for cart, quantity, discount, GST, totals.
   - Create `settingsSlice` for store name, address, phone, GST settings, currency, footer message, auto print.
   - Create `invoiceSlice` for invoice history and current invoice.
   - Connect Redux store to the app using `Provider`.

4. **Add Local Persistence**
   - Use `AsyncStorage`.
   - Persist:
     - Store settings
     - Billing settings
     - Receipt settings
     - Completed invoice history

5. **Create Navigation**
   - Add main navigation with screens:
     - Billing
     - Receipt Preview
     - Billing History
     - Settings

6. **Build Billing Screen**
   - Show product list.
   - Allow add product to bill.
   - Increase/decrease quantity.
   - Remove product.
   - Apply discount.
   - Calculate subtotal, GST, and grand total.
   - Add “Generate Bill” action.

7. **Build Receipt Preview Screen**
   - Format receipt exactly like a printable bill.
   - Include:
     - Store name
     - Invoice number
     - Date and time
     - Product list
     - Quantity
     - Tax
     - Grand total
     - Footer message

8. **Build Settings Screen**
   - Store settings:
     - Store name
     - Store address
     - Phone number
   - Billing settings:
     - GST enabled/disabled
     - GST percentage
     - Currency symbol
   - Receipt settings:
     - Footer message
     - Auto print toggle

9. **Build Billing History Screen**
   - Save completed invoices locally.
   - Display:
     - Invoice number
     - Date
     - Total amount
   - Allow user to view invoice details.
   - Allow user to open receipt preview again.

10. **Prepare APK Download**
   - Test app on Android emulator/device.
   - Create release APK.
   - Include APK in final deliverables.
   - Add screenshots and README.

**Final Deliverables**
- GitHub repository
- README documentation
- APK build
- App screenshots
- Architecture overview