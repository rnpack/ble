import { NitroModules } from 'react-native-nitro-modules';
import type { Ble } from './Ble.nitro';

const BleHybridObject = NitroModules.createHybridObject<Ble>('Ble');

export function multiply(a: number, b: number): number {
  return BleHybridObject.multiply(a, b);
}

export * from './hooks';
export * from './types';
export * from './contexts';
