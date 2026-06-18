import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigator} from './src/navigation/AppNavigator';
import {loadInvoices} from './src/store/invoiceSlice';
import {loadSettings} from './src/store/settingsSlice';
import {store} from './src/store';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppBootstrap />
      </SafeAreaProvider>
    </Provider>
  );
}

function AppBootstrap() {
  useEffect(() => {
    store.dispatch(loadSettings());
    store.dispatch(loadInvoices());
  }, []);

  return <AppNavigator />;
}

export default App;
