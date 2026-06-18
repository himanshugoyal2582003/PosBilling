# Architecture Overview

## Project Summary

POSBillingApp is a React Native CLI application built with TypeScript. It implements a Point of Sale billing workflow with Redux Toolkit state management, local persistence, formatted receipt previews, PDF receipt generation, billing history, and configurable store settings.

## Technology Stack

- React Native CLI
- TypeScript
- Redux Toolkit
- React Redux
- React Navigation
- AsyncStorage
- React Native Vector Icons
- React Native HTML to PDF
- React Native Share

## Folder Structure

```txt
src/
├── components/       Reusable UI building blocks
├── hooks/            Typed Redux hooks
├── navigation/       Stack and tab navigation setup
├── screens/          Billing, receipt, history, and settings screens
├── store/            Redux slices, store, and persistence helpers
├── types/            Shared TypeScript models and native module declarations
└── utils/            Billing calculations, receipt formatting, and sample products
```

## Android Native Resources

The Android app uses a custom launcher logo through drawable XML resources:

- `android/app/src/main/res/drawable/ic_launcher.xml`
- `android/app/src/main/res/drawable/ic_launcher_round.xml`

The manifest points to these launcher icons with:

- `android:icon="@drawable/ic_launcher"`
- `android:roundIcon="@drawable/ic_launcher_round"`

Material tab icons are loaded through `react-native-vector-icons`, with the Android font copy step configured in `android/app/build.gradle`.

## State Management

The app uses Redux Toolkit with three slices:

- `billingSlice`: manages cart items, product quantities, discounts, and current bill state.
- `settingsSlice`: manages store information, GST configuration, currency symbol, footer message, and auto-print preference.
- `invoiceSlice`: manages completed invoices, selected invoice, and billing history.

Typed hooks are provided through `useAppDispatch` and `useAppSelector`.

## Persistence

AsyncStorage is used for local persistence:

- Store, billing, and receipt settings are saved under `pos.settings`.
- Completed invoices are saved under `pos.invoices`.

Settings and invoices are loaded when the app starts.

## Main Screens

### Billing Screen

Users can add products, change quantity, remove products, apply discount, view subtotal, calculate GST, and generate a bill.

### Receipt Preview Screen

Displays a formatted receipt with store details, invoice number, date and time, product list, tax details, grand total, and footer message. Users can generate a PDF receipt and open it through Android's app chooser.

### Billing History Screen

Displays completed invoices with invoice number, date, and total amount. Users can open any previous receipt again.

### Settings Screen

Users can edit store information, GST settings, currency symbol, footer message, and auto-print toggle. Changes are saved only after pressing the Update Changes button.

## PDF Receipt Flow

1. User opens Receipt Preview.
2. User taps Generate PDF.
3. The receipt data is converted into HTML.
4. `react-native-html-to-pdf` creates a PDF file in the app cache.
5. The generated file path is shown to the user.
6. The Open With action uses `react-native-share` to show Android apps that can open or share the PDF.

## Data Flow

1. User adds products on the Billing screen.
2. Billing totals are calculated from cart state and settings.
3. User generates a bill.
4. An invoice snapshot is created with cart items, totals, and current settings.
5. Invoice is saved to Redux and persisted in AsyncStorage.
6. Receipt Preview displays the saved invoice.
7. Billing History can reopen saved invoice receipts.
8. Receipt Preview can generate and share/open a PDF version of the invoice.

## Build And Test

Use Android Studio or a connected Android phone with USB debugging enabled.

```bash
npm install
npm run android
```

For validation:

```bash
npx tsc --noEmit
npm run lint
```

For APK build:

```bash
cd android
gradlew assembleDebug
```

Debug APK output:

```txt
android/app/build/outputs/apk/debug/app-debug.apk
```
