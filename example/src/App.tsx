import { StyleSheet, View, Text } from 'react-native';
import { BleManagerProvider } from '@rnpack/ble';

export default function App() {
  return (
    <BleManagerProvider>
      <View style={styles.container}>
        <Text style={styles?.text}>Added Ble Manager Provider</Text>
      </View>
    </BleManagerProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  text: {
    color: '#000000',
  },
});
