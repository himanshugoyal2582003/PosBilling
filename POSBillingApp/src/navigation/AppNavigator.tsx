import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BillingScreen} from '../screens/BillingScreen';
import {BillingHistoryScreen} from '../screens/BillingHistoryScreen';
import {ReceiptPreviewScreen} from '../screens/ReceiptPreviewScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import type {MainTabParamList, RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();

function BillingIcon({color, size}: {color: string; size: number}) {
  return <MaterialIcons name="point-of-sale" color={color} size={size} />;
}

function HistoryIcon({color, size}: {color: string; size: number}) {
  return <MaterialIcons name="receipt-long" color={color} size={size} />;
}

function SettingsIcon({color, size}: {color: string; size: number}) {
  return <MaterialIcons name="settings" color={color} size={size} />;
}

function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarActiveTintColor: '#166534',
        tabBarInactiveTintColor: '#6b7280',
        tabBarLabelStyle: {fontSize: 12, fontWeight: '700'},
      }}>
      <Tabs.Screen
        name="Billing"
        component={BillingScreen}
        options={{
          tabBarIcon: BillingIcon,
        }}
      />
      <Tabs.Screen
        name="History"
        component={BillingHistoryScreen}
        options={{
          tabBarIcon: HistoryIcon,
        }}
      />
      <Tabs.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: SettingsIcon,
        }}
      />
    </Tabs.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ReceiptPreview"
          component={ReceiptPreviewScreen}
          options={{title: 'Receipt Preview'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
