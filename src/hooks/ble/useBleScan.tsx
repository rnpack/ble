import { useEffect } from 'react';
import type { BleError, Device, ScanOptions, UUID } from 'react-native-ble-plx';

import { useBleManagerContext } from './useBleManagerContext';

interface StartBleScanArgsType {
  uuids?: UUID[];
  scanOptions?: ScanOptions;
  scanDuration?: number;
}

interface UseBleScanReturnType {
  startBleScan: (args?: StartBleScanArgsType) => Promise<void>;
  stopBleScan: () => Promise<void>;
}

interface UseBleScanProps {
  onBleDeviceFound: (device: Device) => void;
  onBleScanStart?: () => void;
  onBleScanStop?: () => void;
}

function useBleScan(props?: UseBleScanProps): UseBleScanReturnType {
  const { bleManager } = useBleManagerContext();

  useEffect(() => {
    return () => {
      stopBleScan();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startBleScan(args?: StartBleScanArgsType): Promise<void> {
    try {
      console.info('Ble scan starting...');
      props?.onBleScanStart?.();
      await bleManager?.startDeviceScan(
        args?.uuids ?? null,
        args?.scanOptions ?? null,
        (error: BleError | null, device: Device | null) => {
          if (error) {
            console.error('Ble scan error: ', error?.message);
            return;
          }

          if (device) {
            props?.onBleDeviceFound(device);
          }
        }
      );

      if (args?.scanDuration) {
        setTimeout(async () => {
          await stopBleScan();
        }, args?.scanDuration);
      }
    } catch (error: unknown) {
      const err: Error = error as Error;

      console.error('Ble scan Error: ', err?.message);

      props?.onBleScanStop?.();
    }
  }

  async function stopBleScan(): Promise<void> {
    try {
      await bleManager?.stopDeviceScan();
      console.info('Ble scan stopped...');
    } catch (error: unknown) {
      const err: Error = error as Error;

      console.error('Ble scan stop Error: ', err?.message);
    }

    props?.onBleScanStop?.();
  }

  return { startBleScan, stopBleScan };
}
export type { StartBleScanArgsType, UseBleScanReturnType, UseBleScanProps };
export { useBleScan };
