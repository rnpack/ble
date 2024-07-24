import type { UUID } from 'react-native-ble-plx';

interface DeviceType {
  id: UUID;
  name: string | null;
  localName: string | null;
}

export type { DeviceType };
