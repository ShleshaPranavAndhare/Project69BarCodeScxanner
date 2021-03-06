import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Scanscreen from './ScanScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <Scanscreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
