import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {useAppSelector} from '../hooks/useAppSelector';
import type {RootStackParamList} from '../navigation/types';
import {formatCurrency, formatDateTime} from '../utils/receipt';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function BillingHistoryScreen() {
  const navigation = useNavigation<Navigation>();
  const invoices = useAppSelector(state => state.invoices.invoices);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Billing History</Text>
      <FlatList
        data={invoices}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No completed invoices yet.</Text>}
        renderItem={({item}) => (
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('ReceiptPreview', {invoiceId: item.id})}
            style={styles.invoiceCard}>
            <View>
              <Text style={styles.invoiceNumber}>{item.invoiceNumber}</Text>
              <Text style={styles.date}>{formatDateTime(item.createdAt)}</Text>
              <Text style={styles.items}>{item.items.length} product type(s)</Text>
            </View>
            <Text style={styles.total}>
              {formatCurrency(item.settingsSnapshot.billing.currencySymbol, item.total)}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8fafc',
    flex: 1,
    padding: 16,
  },
  date: {
    color: '#64748b',
    marginTop: 4,
  },
  empty: {
    color: '#64748b',
  },
  invoiceCard: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 14,
  },
  invoiceNumber: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '800',
  },
  items: {
    color: '#475569',
    marginTop: 4,
  },
  title: {
    color: '#111827',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 12,
  },
  total: {
    color: '#166534',
    fontSize: 16,
    fontWeight: '800',
  },
});
