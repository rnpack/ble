import type { BleManager, Characteristic } from 'react-native-ble-plx';

import { useBleManagerContext } from './useBleManagerContext';

import type { SendMessageToBleArgs } from '../../types';

interface UseBleOperationReturns {
  sendMessageToBle: (
    args: SendMessageToBleArgs
  ) => Promise<Characteristic | void>;
}

function useBleOperation(): UseBleOperationReturns {
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

export type { SendMessageToBleArgs, UseBleOperationReturns };
export { useBleOperation };
