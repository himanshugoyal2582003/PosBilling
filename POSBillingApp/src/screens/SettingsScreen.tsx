import React, {useEffect, useMemo, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Switch, Text, TextInput, View} from 'react-native';
import {PrimaryButton} from '../components/PrimaryButton';
import {Section} from '../components/Section';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import {
  updateBillingSettings,
  updateReceiptSettings,
  updateStoreSettings,
} from '../store/settingsSlice';
import type {SettingsState} from '../types';

export function SettingsScreen() {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(state => state.settings);
  const [draft, setDraft] = useState<SettingsState>(settings);

  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  const hasChanges = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(settings),
    [draft, settings],
  );

  const updateStoreDraft = (value: Partial<SettingsState['store']>) => {
    setDraft(current => ({...current, store: {...current.store, ...value}}));
  };

  const updateBillingDraft = (value: Partial<SettingsState['billing']>) => {
    setDraft(current => ({...current, billing: {...current.billing, ...value}}));
  };

  const updateReceiptDraft = (value: Partial<SettingsState['receipt']>) => {
    setDraft(current => ({...current, receipt: {...current.receipt, ...value}}));
  };

  const saveChanges = () => {
    dispatch(updateStoreSettings(draft.store));
    dispatch(updateBillingSettings(draft.billing));
    dispatch(updateReceiptSettings(draft.receipt));
    Alert.alert('Settings updated', 'Your changes have been saved.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Section title="Store Settings">
        <Field
          label="Store Name"
          value={draft.store.storeName}
          onChangeText={storeName => updateStoreDraft({storeName})}
        />
        <Field
          label="Store Address"
          value={draft.store.storeAddress}
          onChangeText={storeAddress => updateStoreDraft({storeAddress})}
        />
        <Field
          label="Phone Number"
          keyboardType="phone-pad"
          value={draft.store.phoneNumber}
          onChangeText={phoneNumber => updateStoreDraft({phoneNumber})}
        />
      </Section>

      <Section title="Billing Settings">
        <View style={styles.switchRow}>
          <Text style={styles.label}>GST Enabled</Text>
          <Switch
            value={draft.billing.gstEnabled}
            onValueChange={gstEnabled => {
              updateBillingDraft({gstEnabled});
            }}
          />
        </View>
        <Field
          label="GST Percentage"
          keyboardType="numeric"
          value={String(draft.billing.gstPercentage)}
          onChangeText={value => updateBillingDraft({gstPercentage: Number(value) || 0})}
        />
        <Field
          label="Currency Symbol"
          value={draft.billing.currencySymbol}
          onChangeText={currencySymbol => updateBillingDraft({currencySymbol})}
        />
      </Section>

      <Section title="Receipt Settings">
        <Field
          label="Footer Message"
          value={draft.receipt.footerMessage}
          onChangeText={footerMessage => updateReceiptDraft({footerMessage})}
        />
        <View style={styles.switchRow}>
          <Text style={styles.label}>Auto Print</Text>
          <Switch
            value={draft.receipt.autoPrint}
            onValueChange={autoPrint => {
              updateReceiptDraft({autoPrint});
            }}
          />
        </View>
      </Section>

      <PrimaryButton label="Update Changes" onPress={saveChanges} disabled={!hasChanges} />
    </ScrollView>
  );
}

function Field({
  label,
  value,
  onChangeText,
  keyboardType,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'default' | 'numeric' | 'phone-pad';
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        style={styles.input}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8fafc',
    padding: 16,
    paddingBottom: 28,
  },
  field: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#cbd5e1',
    borderRadius: 8,
    borderWidth: 1,
    color: '#111827',
    marginTop: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  label: {
    color: '#334155',
    fontSize: 15,
    fontWeight: '600',
  },
  switchRow: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 12,
  },
});
