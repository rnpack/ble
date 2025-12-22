import { NitroModules } from 'react-native-nitro-modules';
import type { RNPackBle } from './RNPackBle.nitro';

const RNPackBleHybridObject =
  NitroModules.createHybridObject<RNPackBle>('RNPackBle');

export function multiply(a: number, b: number): number {
  return RNPackBleHybridObject.multiply(a, b);
}

export * from './hooks';
export * from './types';
export * from './contexts';
