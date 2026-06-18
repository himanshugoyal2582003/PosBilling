import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {generatePDF} from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import {PrimaryButton} from '../components/PrimaryButton';
import {useAppSelector} from '../hooks/useAppSelector';
import type {RootStackParamList} from '../navigation/types';
import {buildReceipt, buildReceiptHtml} from '../utils/receipt';

type Props = NativeStackScreenProps<RootStackParamList, 'ReceiptPreview'>;

export function ReceiptPreviewScreen({navigation, route}: Props) {
  const [pdfPath, setPdfPath] = useState<string>();
  const invoice = useAppSelector(state =>
    state.invoices.invoices.find(item => item.id === route.params.invoiceId),
  );

  if (!invoice) {
    return (
      <View style={styles.centered}>
        <Text style={styles.missing}>Invoice not found.</Text>
        <PrimaryButton label="Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const generatePdf = async () => {
    try {
      const result = await generatePDF({
        html: buildReceiptHtml(invoice),
        fileName: invoice.invoiceNumber,
      });

      if (!result.filePath) {
        Alert.alert('PDF generated', 'Receipt PDF created.');
        return;
      }

      setPdfPath(result.filePath);
      Alert.alert('PDF generated', result.filePath, [
        {text: 'OK', style: 'cancel'},
        {text: 'Open With', onPress: () => openPdf(result.filePath!)},
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      Alert.alert('PDF failed', message);
    }
  };

  const openPdf = async (filePath: string) => {
    try {
      await Share.open({
        title: 'Open receipt PDF',
        url: `file://${filePath}`,
        type: 'application/pdf',
        showAppsToView: true,
        failOnCancel: false,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to open PDF.';
      Alert.alert('Open With failed', message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Receipt Preview</Text>
      <View style={styles.receiptBox}>
        <Text style={styles.receiptText}>{buildReceipt(invoice)}</Text>
      </View>
      <View style={styles.actions}>
        <PrimaryButton label="Generate PDF" onPress={generatePdf} />
      </View>
      {pdfPath ? (
        <View style={styles.actions}>
          <PrimaryButton label="Open Last PDF" onPress={() => openPdf(pdfPath)} />
        </View>
      ) : null}
      <PrimaryButton label="Back to Billing" onPress={() => navigation.navigate('MainTabs')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#f8fafc',
    padding: 16,
    paddingBottom: 28,
  },
  missing: {
    color: '#334155',
    fontSize: 16,
  },
  actions: {
    marginBottom: 12,
  },
  receiptBox: {
    backgroundColor: '#ffffff',
    borderColor: '#d1d5db',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 18,
    padding: 16,
  },
  receiptText: {
    color: '#111827',
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 22,
  },
  title: {
    color: '#111827',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 12,
  },
});
