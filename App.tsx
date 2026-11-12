import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet
} from 'react-native';

import {
  SafeAreaProvider, SafeAreaView
} from 'react-native-safe-area-context';

import { Provider } from 'react-redux';
import { store } from './store';

import CounterScreen from './screens/CounterScreen';
import CartScreen from './screens/CartScreen';

function MainScreen() {
  const [screen, setScreen] = useState('Counter');

  return (
    <SafeAreaView style={s.container}>
      <View style={s.menu}>
        <TouchableOpacity
          style={s.button}
          onPress={() => setScreen('Counter')}
        >
          <Text style={s.text}>Bài 1: Counter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={s.button}
          onPress={() => setScreen('Cart')}
        >
          <Text style={s.text}>Bài 2: Cart</Text>
        </TouchableOpacity>
      </View>

      {screen === 'Counter'
        ? <CounterScreen />
        : <CartScreen />}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <MainScreen />
      </SafeAreaProvider>
    </Provider>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1
  },
  menu: {
    flexDirection: 'row',
    backgroundColor: '#3949ab',
    padding: 10,
    gap: 10
  },
  button: {
    flex: 1,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center'
  },
  text: {
    color: '#3949ab',
    fontWeight: 'bold'
  }
});