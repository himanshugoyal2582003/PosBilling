# 🧾 POSBillingApp

<div align="center">

![React Native](https://img.shields.io/badge/React%20Native-0.86.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.12.0-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Android](https://img.shields.io/badge/Platform-Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)

**A full-featured Point of Sale (POS) Billing Application built with React Native CLI, TypeScript, and Redux Toolkit.**

Generate invoices · Manage billing history · Preview & export PDF receipts · Configure store settings

</div>

---

## 📱 Demo Video

<div align="center">

[![Demo Video](https://img.shields.io/badge/▶%20Watch%20Demo-Google%20Drive-4285F4?style=for-the-badge&logo=googledrive&logoColor=white)](https://drive.google.com/file/d/1Y5tUlM3GmgzcVTTxZ8AceSgmyapNobq-/view?usp=drive_link)

</div>

> Click the button above to watch the full demo video of the application in action.

---

## 📸 Screenshots

<div align="center">

| Billing Screen (Empty) | Billing Screen (With Cart) |
|:---:|:---:|
| ![Billing Empty](./screenshots/billing_empty.jpeg) | ![Billing Cart](./screenshots/billing_cart.jpeg) |

| Receipt Preview | PDF Generation |
|:---:|:---:|
| ![Receipt Preview](./screenshots/receipt_preview.jpeg) | ![PDF Generation](./screenshots/pdf_generation.jpeg) |

| Billing History | Invoice Details |
|:---:|:---:|
| ![Billing History](./screenshots/billing_history.jpeg) | ![Invoice Details](./screenshots/invoice_details.jpeg) |

| Settings | |
|:---:|:---:|
| ![Settings](./screenshots/settings.jpeg) | |

</div>

---

## ✨ Features

### 🛒 Billing Module
- Add products from a predefined product list to the bill
- Increase or decrease product quantities
- Remove individual products from the bill
- Apply a bill-level discount
- Enable / disable GST and configure the GST percentage
- View real-time subtotal, GST amount, and grand total

**Sample Calculation:**
```
Coffee × 2 = ₹100
Tea    × 1 = ₹20
─────────────────
Subtotal     ₹120
GST (5%)     ₹6
─────────────────
Total        ₹126
```

### 🧾 Receipt Preview
- Auto-generated receipt after bill creation
- Contains store name, invoice number, date & time, product list, quantities, tax info, grand total, and footer message
- PDF export via `react-native-html-to-pdf`
- Share / open PDF with any compatible Android app via `react-native-share`

### ⚙️ Settings Module
- **Store Settings** — Store name, address, phone number
- **Billing Settings** — GST toggle, GST percentage, currency symbol
- **Receipt Settings** — Custom footer message, auto-print toggle
- All settings are persisted locally with AsyncStorage and reflected app-wide

### 📋 Billing History
- Stores all completed invoices locally
- Displays invoice number, date, and total amount
- Tap any invoice to re-open its full receipt preview

---

## 🏗️ Architecture Overview

```
src/
├── components/      # Reusable UI building blocks
├── hooks/           # Typed Redux hooks (useAppDispatch, useAppSelector)
├── navigation/      # Stack and Bottom Tab navigation setup
├── screens/         # Billing, Receipt Preview, History, Settings screens
├── store/           # Redux slices, store config, and persistence helpers
│   ├── index.ts
│   ├── billingSlice.ts   # Cart items, quantities, discounts, totals
│   ├── settingsSlice.ts  # Store info, GST config, receipt config
│   └── invoiceSlice.ts   # Invoice history and current invoice
├── types/           # Shared TypeScript interfaces and type declarations
└── utils/           # Billing calculations, receipt formatting, sample products
```

### Redux State Management

| Slice | Manages |
|---|---|
| `billingSlice` | Cart items, product quantities, discounts, tax calculations, bill totals |
| `settingsSlice` | Store information, GST config, currency symbol, footer message, auto-print |
| `invoiceSlice` | Completed invoices, selected invoice, billing history |

### Data Flow

```
User adds products (Billing Screen)
       ↓
Redux billingSlice + settingsSlice → calculates totals
       ↓
User generates bill → invoiceSlice saves snapshot
       ↓
Invoice persisted to AsyncStorage (pos.invoices)
       ↓
Receipt Preview Screen → displays invoice
       ↓
Optional: Generate PDF → HTML → react-native-html-to-pdf → Open/Share
       ↓
Billing History → reopen any past receipt
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React Native CLI | 0.86.0 | Mobile app framework |
| TypeScript | 5.8.3 | Type safety |
| Redux Toolkit | 2.12.0 | State management |
| React Redux | 9.3.0 | React bindings for Redux |
| React Navigation | 7.x | Screen navigation |
| AsyncStorage | 3.1.1 | Local data persistence |
| React Native Vector Icons | 10.3.0 | Tab and UI icons |
| React Native HTML to PDF | 1.3.0 | PDF receipt generation |
| React Native Share | 12.3.1 | Share/open PDF files |

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js >= 22.11.0
- Android Studio with SDK configured
- Java Development Kit (JDK 17+)
- Android device or emulator

### 1. Clone the Repository

```bash
git clone https://github.com/himanshugoyal2582003/PosBilling.git
cd PosBilling/POSBillingApp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run on Android

Start the Metro bundler:

```bash
npm start
```

In a separate terminal, launch the app:

```bash
npm run android
```

#### Running on a Physical Device

1. Enable **Developer Options** on your Android phone
2. Enable **USB Debugging**
3. Connect the phone via USB and approve the debugging prompt
4. Verify the device is recognized:

```bash
adb devices
```

5. Then run `npm run android`

---

## 📦 APK Build

### Debug APK

```bash
cd android
gradlew assembleDebug
```

**Output path:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### Release APK

Add signing configuration in `android/app/build.gradle`, then:

```bash
cd android
gradlew assembleRelease
```

---

## 🔍 Validation

Run TypeScript type checks:

```bash
npx tsc --noEmit
```

Run ESLint:

```bash
npm run lint
```

---

## 📋 Expected Screens

| Screen | Description |
|---|---|
| **Billing Screen** | Product list, cart summary, totals section, generate bill action |
| **Receipt Preview Screen** | Formatted printable receipt layout, PDF export |
| **Billing History Screen** | Invoice list with invoice number, date, amount; tap to view details |
| **Settings Screen** | Store settings, billing settings, receipt settings |

---

## 🗂️ Deliverables

- ✅ GitHub Repository
- ✅ README Documentation
- ✅ APK Build
- ✅ Application Screenshots
- ✅ Architecture Overview

---

## 📄 License

This project was built as part of a technical assessment for a React Native development internship.

---

<div align="center">

Made with ❤️ using React Native & Redux Toolkit

</div>
