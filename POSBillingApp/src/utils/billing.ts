import type {CartItem} from '../types';

export function calculateTotals(
  items: CartItem[],
  discount: number,
  gstEnabled: boolean,
  gstPercentage: number,
) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const normalizedDiscount = Math.min(Math.max(discount, 0), subtotal);
  const taxableAmount = subtotal - normalizedDiscount;
  const tax = gstEnabled ? (taxableAmount * gstPercentage) / 100 : 0;
  const total = taxableAmount + tax;

  return {subtotal, discount: normalizedDiscount, tax, total};
}
