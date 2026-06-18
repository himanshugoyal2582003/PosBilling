# POSBillingApp

React Native CLI Point of Sale billing application with Redux Toolkit state management, local invoice history, receipt preview, and configurable store settings.

## Features

- Add products to a bill
- Increase, decrease, and remove product quantities
- Apply bill discount
- Enable or disable GST
- Configure GST percentage
- Configure currency symbol
- Generate formatted receipt preview
- Save completed invoices locally
- View billing history
- Reopen old receipts
- Persist store, billing, and receipt settings locally

## Tech Stack

- React Native CLI
- TypeScript
- Redux Toolkit
- React Redux
- React Navigation
- AsyncStorage

## Project Structure

```txt
src/
├── components/
├── hooks/
├── navigation/
├── screens/
├── store/
├── types/
└── utils/
```

## Installation

Install dependencies:

```bash
npm install
```

## Run On Android

Start Metro:

```bash
npm start
```

In another terminal, run the app:

```bash
npm run android
```

Before running on a real mobile device:

1. Enable Developer Options on the Android phone.
2. Enable USB Debugging.
3. Connect the phone with USB.
4. Allow the USB debugging prompt on the phone.
5. Confirm the device is visible:

```bash
adb devices
```

Then run:

```bash
npm run android
```

## Android APK Build

Create a debug APK:

```bash
cd android
gradlew assembleDebug
```

Debug APK path:

```txt
android/app/build/outputs/apk/debug/app-debug.apk
```

Create a release APK after signing configuration is added:

```bash
cd android
gradlew assembleRelease
```

## Validation

Run TypeScript check:

```bash
npx tsc --noEmit
```

Run lint:

```bash
npm run lint
```

## Application Screens

- Billing Screen
- Receipt Preview Screen
- Billing History Screen
- Settings Screen

## Architecture

See [Architecture Overview.md](./Architecture%20Overview.md).
