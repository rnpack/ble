import type {
  Base64,
  Characteristic,
  ConnectionOptions,
  DeviceId,
  ScanOptions,
  UUID,
} from 'react-native-ble-plx';

interface DeviceType {
  id: UUID;
  name: string | null;
  localName: string | null;
}

interface ProcessBleOperationMessageArgs {
  isNext: boolean;
  message?: string;
  isTimmer?: boolean;
}

interface ProcessMessageToBleArgs {
  message: string;
}

interface ProcessBleOperationArgs {
  operation: Array<string>;
  deviceId?: string;
  isTimmer?: boolean;
}

interface ConnectToDeviceArgs {
  deviceId: DeviceId;
  options?: ConnectionOptions;
}

interface StartBleMonitorArgs {
  deviceId: DeviceId;
  serviceUUID: UUID;
  characteristicUUID: UUID;
  onChangeDeviceCharacteristic: (characteristic: Characteristic) => void;
}

interface SendMessageToBleArgs {
  deviceId: DeviceId;
  message: Base64;
  serviceUUID: UUID;
  characteristicUUID: UUID;
}

interface StartBleScanArgs {
  uuids?: UUID[];
  scanOptions?: ScanOptions;
  scanDuration?: number;
}

interface RequestMTUForDeviceArgs {
  deviceId: DeviceId;
  mtu: number;
}

interface CharacteristicsForDeviceArgs {
  deviceId: DeviceId;
  serviceUUID: UUID;
}

export type {
  DeviceType,
  ProcessBleOperationMessageArgs,
  ProcessMessageToBleArgs,
  ProcessBleOperationArgs,
  ConnectToDeviceArgs,
  StartBleMonitorArgs,
  SendMessageToBleArgs,
  StartBleScanArgs,
  RequestMTUForDeviceArgs,
  CharacteristicsForDeviceArgs,
};
