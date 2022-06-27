import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigator from './src/navigation/Navigator';

const App = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Navigator />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
