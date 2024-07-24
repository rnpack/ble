import { useEffect, useRef } from 'react';
import type {
  Subscription,
  BleError,
  Characteristic,
  DeviceId,
  UUID,
} from 'react-native-ble-plx';

import { useBleManagerContext } from './useBleManagerContext';

interface StartBleMonitorArgs {
  deviceId: DeviceId;
  serviceUUID: UUID;
  characteristicUUID: UUID;
  onChangeDeviceCharacteristic: (characteristic: Characteristic) => void;
}

interface UseBleMonitorReturnType {
  startBleMonitor: (args: StartBleMonitorArgs) => void;
  stopBleMonitor: () => void;
}

function useBleMonitor(): UseBleMonitorReturnType {
  const { bleManager } = useBleManagerContext();

  const bleMonitorListener = useRef<Subscription>();

  useEffect(() => {
    return () => {
      stopBleMonitor();
    };
  }, []);

  function startBleMonitor(args: StartBleMonitorArgs): void {
    bleMonitorListener.current = bleManager?.monitorCharacteristicForDevice(
      args?.deviceId,
      args?.serviceUUID,
      args?.characteristicUUID,
      (error: BleError | null, characteristic: Characteristic | null) => {
        if (error) {
          console.error(
            `Monitor characteristic for device ${args?.deviceId} Error: `,
            error?.message
          );

          return;
        }

        if (characteristic) {
          args?.onChangeDeviceCharacteristic(characteristic);
        }
      }
    );
  }

  function stopBleMonitor(): void {
    bleMonitorListener?.current?.remove();
  }

  return { startBleMonitor, stopBleMonitor };
}

export type { UseBleMonitorReturnType, StartBleMonitorArgs };
export { useBleMonitor };
