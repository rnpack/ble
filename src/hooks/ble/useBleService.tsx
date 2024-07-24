import type {
  BleManager,
  Characteristic,
  Device,
  DeviceId,
  Service,
  UUID,
} from 'react-native-ble-plx';

import { useBleManagerContext } from './useBleManagerContext';

interface RequestMTUForDeviceArgs {
  deviceId: DeviceId;
  mtu: number;
}

interface CharacteristicsForDeviceArgs {
  deviceId: DeviceId;
  serviceUUID: UUID;
}

interface UseBleServiceReturnType {
  discoverAllServicesAndCharacteristicsForDevice: (
    deviceId: DeviceId
  ) => Promise<Device | void>;
  requestMTUForDevice: (
    args: RequestMTUForDeviceArgs
  ) => Promise<Device | void>;
  servicesForDevice: (deviceId: DeviceId) => Promise<Service[] | void>;
  characteristicsForDevice: (
    args: CharacteristicsForDeviceArgs
  ) => Promise<Characteristic[] | void>;
}

function useBleService(): UseBleServiceReturnType {
  const { bleManager } = useBleManagerContext();

  const bleMgr: BleManager = bleManager as BleManager;

  async function discoverAllServicesAndCharacteristicsForDevice(
    deviceId: DeviceId
  ): Promise<Device | void> {
    try {
      const device: Device =
        await bleMgr?.discoverAllServicesAndCharacteristicsForDevice(deviceId);

      return device;
    } catch (error: unknown) {
      const err: Error = error as Error;

      console.error(
        `Discover all services and characteristics for device ${deviceId} Error: `,
        err?.message
      );
    }
  }

  async function requestMTUForDevice(
    args: RequestMTUForDeviceArgs
  ): Promise<Device | void> {
    try {
      const device: Device = await bleMgr?.requestMTUForDevice(
        args?.deviceId,
        args?.mtu
      );
      return device;
    } catch (error: unknown) {
      const err: Error = error as Error;

      console.error(
        `Request MTU for Device ${args?.deviceId} with ${args?.mtu} Error: `,
        err?.message
      );
    }
  }

  async function servicesForDevice(
    deviceId: DeviceId
  ): Promise<Service[] | void> {
    try {
      const services: Service[] = await bleMgr?.servicesForDevice(deviceId);

      return services;
    } catch (error: unknown) {
      const err: Error = error as Error;

      console.error(
        `Read services for device ${deviceId} Error: `,
        err?.message
      );
    }
  }

  async function characteristicsForDevice(
    args: CharacteristicsForDeviceArgs
  ): Promise<Characteristic[] | void> {
    try {
      const characteristics: Characteristic[] =
        await bleMgr?.characteristicsForDevice(
          args?.deviceId,
          args?.serviceUUID
        );

      return characteristics;
    } catch (error: unknown) {
      const err: Error = error as Error;

      console.error(
        `Read characteristics for device ${args?.deviceId} on service ${args?.serviceUUID} Error: `,
        err?.message
      );
    }
  }

  return {
    discoverAllServicesAndCharacteristicsForDevice,
    requestMTUForDevice,
    servicesForDevice,
    characteristicsForDevice,
  };
}

export type {
  UseBleServiceReturnType,
  RequestMTUForDeviceArgs,
  CharacteristicsForDeviceArgs,
};
export { useBleService };
