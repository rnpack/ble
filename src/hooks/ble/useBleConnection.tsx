import type {
  BleManager,
  ConnectionOptions,
  Device,
  DeviceId,
} from 'react-native-ble-plx';

import { useBleManagerContext } from './useBleManagerContext';

interface ConnectToDeviceArgs {
  deviceId: DeviceId;
  options?: ConnectionOptions;
}

interface UseBleConnectionReturnType {
  connectToDevice: (deviceId: DeviceId) => Promise<Device>;
  cancelDeviceConnection: (deviceId: DeviceId) => Promise<Device>;
}

interface UseBleConnectionProps {
  onDeviceConnect?: (deviceId: DeviceId) => void;
  onDeviceConnectError?: (deviceId: DeviceId) => void;
  onDeviceDisconnect?: (deviceId: DeviceId) => void;
}

function useBleConnection(props?: UseBleConnectionProps) {
  const { bleManager } = useBleManagerContext();

  const bleMgr: BleManager = bleManager as BleManager;

  async function connectToDevice(
    args: ConnectToDeviceArgs
  ): Promise<Device | void> {
    try {
      console.info('Trying to connect with ', args?.deviceId);
      const device: Device = await bleMgr?.connectToDevice(
        args?.deviceId,
        args?.options
      );
      props?.onDeviceConnect?.(device?.id);

      startDisconnectListener(device);

      console.info('Connected with ', args?.deviceId);

      return device;
    } catch (error: unknown) {
      const err: Error = error as Error;

      console.error(
        `Ble connection with ${args?.deviceId} Error: `,
        err?.message
      );

      props?.onDeviceConnectError?.(args?.deviceId);
    }
  }

  async function cancelDeviceConnection(
    deviceId: DeviceId
  ): Promise<Device | void> {
    try {
      const device = await bleMgr?.cancelDeviceConnection(deviceId);

      return device;
    } catch (error: unknown) {
      const err: Error = error as Error;

      console.error(`Cancel connection with ${deviceId} Error: `, err?.message);
    }
  }

  function startDisconnectListener(device: Device): void {
    device?.onDisconnected((error, disconnectedDevice) => {
      if (error) {
        console.error(
          'Device disconnect Error on device: ',
          disconnectedDevice?.id
        );
        return;
      }

      props?.onDeviceDisconnect?.(device?.id);
    });
  }

  return { connectToDevice, cancelDeviceConnection };
}

export type { UseBleConnectionReturnType };
export { useBleConnection };
