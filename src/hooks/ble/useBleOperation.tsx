import type {
  Base64,
  BleManager,
  Characteristic,
  DeviceId,
  UUID,
} from 'react-native-ble-plx';

import { useBleManagerContext } from './useBleManagerContext';

interface SendMessageToBleArgs {
  deviceId: DeviceId;
  message: Base64;
  serviceUUID: UUID;
  characteristicUUID: UUID;
}

interface UseBleOperationReturnType {
  sendMessageToBle: (
    args: SendMessageToBleArgs
  ) => Promise<Characteristic | void>;
}

function useBleOperation(): UseBleOperationReturnType {
  const { bleManager } = useBleManagerContext();

  const bleMgr: BleManager = bleManager as BleManager;

  async function sendMessageToBle(
    args: SendMessageToBleArgs
  ): Promise<Characteristic | void> {
    try {
      const characteristic: Characteristic =
        await bleMgr?.writeCharacteristicWithResponseForDevice(
          args?.deviceId,
          args?.serviceUUID,
          args?.characteristicUUID,
          args?.message
        );

      return characteristic;
    } catch (error: unknown) {
      const err: Error = error as Error;

      console.error(
        `Send message to ble device ${args?.deviceId} Error: `,
        err?.message
      );
    }
  }

  return { sendMessageToBle };
}

export type { SendMessageToBleArgs, UseBleOperationReturnType };
export { useBleOperation };
