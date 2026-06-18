import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  title: string;
  children: React.ReactNode;
};

export function Section({title, children}: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 18,
  },
  title: {
    color: '#1f2937',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
});
