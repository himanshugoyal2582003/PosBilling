import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {PrimaryButton} from '../components/PrimaryButton';
import {Section} from '../components/Section';
import type {RootStackParamList} from '../navigation/types';
import {addInvoice} from '../store/invoiceSlice';
import {
  addProduct,
  clearBill,
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
  setDiscount,
} from '../store/billingSlice';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import {calculateTotals} from '../utils/billing';
import {formatCurrency} from '../utils/receipt';
import {products} from '../utils/products';
import type {Invoice} from '../types';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function BillingScreen() {
  const navigation = useNavigation<Navigation>();
  const dispatch = useAppDispatch();
  const {cart, discount} = useAppSelector(state => state.billing);
  const settings = useAppSelector(state => state.settings);
  const invoiceCount = useAppSelector(state => state.invoices.invoices.length);
  const totals = useMemo(
    () =>
      calculateTotals(
        cart,
        discount,
        settings.billing.gstEnabled,
        settings.billing.gstPercentage,
      ),
    [cart, discount, settings.billing.gstEnabled, settings.billing.gstPercentage],
  );

  const generateBill = () => {
    if (!cart.length) {
      Alert.alert('Empty bill', 'Add at least one product before generating a bill.');
      return;
    }

    const now = new Date();
    const invoice: Invoice = {
      id: `${now.getTime()}`,
      invoiceNumber: `INV-${1001 + invoiceCount}`,
      createdAt: now.toISOString(),
      items: cart,
      discount: totals.discount,
      subtotal: totals.subtotal,
      tax: totals.tax,
      total: totals.total,
      settingsSnapshot: settings,
    };

    dispatch(addInvoice(invoice));
    dispatch(clearBill());
    navigation.navigate('ReceiptPreview', {invoiceId: invoice.id});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Section title="Products">
        <View style={styles.productGrid}>
          {products.map(product => (
            <Pressable
              accessibilityRole="button"
              key={product.id}
              onPress={() => dispatch(addProduct(product))}
              style={styles.productCard}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>
                {formatCurrency(settings.billing.currencySymbol, product.price)}
              </Text>
              <Text style={styles.addText}>Add</Text>
            </Pressable>
          ))}
        </View>
      </Section>

      <Section title="Cart Summary">
        {cart.length === 0 ? (
          <Text style={styles.emptyText}>No products added yet.</Text>
        ) : (
          cart.map(item => (
            <View key={item.id} style={styles.cartRow}>
              <View style={styles.cartInfo}>
                <Text style={styles.cartName}>{item.name}</Text>
                <Text style={styles.cartPrice}>
                  {formatCurrency(settings.billing.currencySymbol, item.price)} each
                </Text>
              </View>
              <View style={styles.quantityControls}>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => dispatch(decreaseQuantity(item.id))}
                  style={styles.smallButton}>
                  <Text style={styles.smallButtonText}>-</Text>
                </Pressable>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => dispatch(increaseQuantity(item.id))}
                  style={styles.smallButton}>
                  <Text style={styles.smallButtonText}>+</Text>
                </Pressable>
              </View>
              <Pressable
                accessibilityRole="button"
                onPress={() => dispatch(removeProduct(item.id))}
                style={styles.removeButton}>
                <Text style={styles.removeText}>Remove</Text>
              </Pressable>
            </View>
          ))
        )}
      </Section>

      <Section title="Totals">
        <View style={styles.discountRow}>
          <Text style={styles.label}>Discount</Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={value => dispatch(setDiscount(Number(value)))}
            placeholder="0"
            style={styles.discountInput}
            value={discount ? String(discount) : ''}
          />
        </View>
        <TotalRow
          label="Subtotal"
          value={formatCurrency(settings.billing.currencySymbol, totals.subtotal)}
        />
        <TotalRow
          label={`GST (${settings.billing.gstEnabled ? settings.billing.gstPercentage : 0}%)`}
          value={formatCurrency(settings.billing.currencySymbol, totals.tax)}
        />
        <TotalRow
          label="Grand Total"
          value={formatCurrency(settings.billing.currencySymbol, totals.total)}
          strong
        />
      </Section>

      <PrimaryButton label="Generate Bill" onPress={generateBill} disabled={!cart.length} />
    </ScrollView>
  );
}

function TotalRow({label, value, strong}: {label: string; value: string; strong?: boolean}) {
  return (
    <View style={styles.totalRow}>
      <Text style={[styles.totalLabel, strong && styles.strong]}>{label}</Text>
      <Text style={[styles.totalValue, strong && styles.strong]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  addText: {
    color: '#166534',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 8,
  },
  cartInfo: {
    flex: 1,
  },
  cartName: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
  },
  cartPrice: {
    color: '#64748b',
    marginTop: 3,
  },
  cartRow: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    padding: 12,
  },
  container: {
    backgroundColor: '#f8fafc',
    padding: 16,
    paddingBottom: 28,
  },
  discountInput: {
    backgroundColor: '#ffffff',
    borderColor: '#cbd5e1',
    borderRadius: 8,
    borderWidth: 1,
    color: '#111827',
    minWidth: 110,
    paddingHorizontal: 12,
    paddingVertical: 8,
    textAlign: 'right',
  },
  discountRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  emptyText: {
    color: '#64748b',
  },
  label: {
    color: '#334155',
    fontSize: 15,
    fontWeight: '600',
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderColor: '#dbeafe',
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: '48%',
    padding: 14,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  productName: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
  },
  productPrice: {
    color: '#475569',
    marginTop: 6,
  },
  quantity: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
    minWidth: 24,
    textAlign: 'center',
  },
  quantityControls: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  removeButton: {
    padding: 6,
  },
  removeText: {
    color: '#b91c1c',
    fontSize: 12,
    fontWeight: '700',
  },
  smallButton: {
    alignItems: 'center',
    backgroundColor: '#e2e8f0',
    borderRadius: 6,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  smallButtonText: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '800',
  },
  strong: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '800',
  },
  totalLabel: {
    color: '#334155',
    fontSize: 15,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  totalValue: {
    color: '#334155',
    fontSize: 15,
    fontWeight: '700',
  },
});
