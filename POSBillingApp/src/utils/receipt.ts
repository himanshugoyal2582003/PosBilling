import type {Invoice} from '../types';

const line = '================================';

export function formatCurrency(symbol: string, amount: number) {
  return `${symbol}${amount.toFixed(2)}`;
}

export function formatDateTime(value: string) {
  return new Date(value).toLocaleString();
}

export function buildReceipt(invoice: Invoice) {
  const {store, billing, receipt} = invoice.settingsSnapshot;
  const itemRows = invoice.items
    .map(item => {
      const total = item.price * item.quantity;
      return `${item.name.padEnd(12)} ${String(item.quantity).padStart(2)} x ${String(
        item.price,
      ).padStart(5)} ${String(total).padStart(7)}`;
    })
    .join('\n');

  return [
    line,
    store.storeName.toUpperCase(),
    store.storeAddress,
    store.phoneNumber,
    line,
    `Invoice : ${invoice.invoiceNumber}`,
    `Date    : ${formatDateTime(invoice.createdAt)}`,
    line,
    itemRows,
    '',
    `Subtotal ${formatCurrency(billing.currencySymbol, invoice.subtotal)}`,
    `Discount ${formatCurrency(billing.currencySymbol, invoice.discount)}`,
    `GST ${billing.gstEnabled ? billing.gstPercentage : 0}% ${formatCurrency(
      billing.currencySymbol,
      invoice.tax,
    )}`,
    `Total ${formatCurrency(billing.currencySymbol, invoice.total)}`,
    '',
    receipt.footerMessage,
    line,
  ].join('\n');
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function buildReceiptHtml(invoice: Invoice) {
  const {store, billing, receipt} = invoice.settingsSnapshot;
  const itemRows = invoice.items
    .map(
      item => `
        <tr>
          <td>${escapeHtml(item.name)}</td>
          <td class="center">${item.quantity}</td>
          <td class="right">${formatCurrency(billing.currencySymbol, item.price)}</td>
          <td class="right">${formatCurrency(
            billing.currencySymbol,
            item.price * item.quantity,
          )}</td>
        </tr>`,
    )
    .join('');

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body {
            color: #111827;
            font-family: monospace;
            padding: 24px;
          }
          .receipt {
            border: 1px solid #111827;
            margin: 0 auto;
            max-width: 420px;
            padding: 18px;
          }
          h1 {
            font-size: 22px;
            margin: 0 0 6px;
            text-align: center;
            text-transform: uppercase;
          }
          .meta,
          .footer {
            text-align: center;
          }
          .rule {
            border-top: 1px dashed #111827;
            margin: 14px 0;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th,
          td {
            padding: 6px 0;
          }
          th {
            border-bottom: 1px solid #d1d5db;
            text-align: left;
          }
          .center {
            text-align: center;
          }
          .right {
            text-align: right;
          }
          .totals {
            margin-top: 12px;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            padding: 4px 0;
          }
          .grand {
            font-size: 18px;
            font-weight: 700;
          }
        </style>
      </head>
      <body>
        <main class="receipt">
          <h1>${escapeHtml(store.storeName)}</h1>
          <div class="meta">${escapeHtml(store.storeAddress)}</div>
          <div class="meta">${escapeHtml(store.phoneNumber)}</div>
          <div class="rule"></div>
          <div>Invoice: ${escapeHtml(invoice.invoiceNumber)}</div>
          <div>Date: ${escapeHtml(formatDateTime(invoice.createdAt))}</div>
          <div class="rule"></div>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th class="center">Qty</th>
                <th class="right">Rate</th>
                <th class="right">Amount</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
          </table>
          <div class="rule"></div>
          <section class="totals">
            <div class="total-row">
              <span>Subtotal</span>
              <span>${formatCurrency(billing.currencySymbol, invoice.subtotal)}</span>
            </div>
            <div class="total-row">
              <span>Discount</span>
              <span>${formatCurrency(billing.currencySymbol, invoice.discount)}</span>
            </div>
            <div class="total-row">
              <span>GST (${billing.gstEnabled ? billing.gstPercentage : 0}%)</span>
              <span>${formatCurrency(billing.currencySymbol, invoice.tax)}</span>
            </div>
            <div class="total-row grand">
              <span>Total</span>
              <span>${formatCurrency(billing.currencySymbol, invoice.total)}</span>
            </div>
          </section>
          <div class="rule"></div>
          <div class="footer">${escapeHtml(receipt.footerMessage)}</div>
        </main>
      </body>
    </html>`;
}
