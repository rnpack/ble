import { useEffect, useRef } from 'react';
import type { Device } from 'react-native-ble-plx';
import { isEmpty } from '@rnpack/utils';

import type { DeviceType } from '../../types';

interface UseBleListReturnType {
  devices: Array<DeviceType>;
  addDevice: (device: Device) => void;
  resetDeviceList: () => void;
}

interface UseBleListProps {
  updateFoundedDevicesList: (devices: Array<DeviceType>) => void;
}

function useBleList(props: UseBleListProps): UseBleListReturnType {
  const devices = useRef<Array<DeviceType>>([]);

  useEffect(() => {
    return () => {
      resetDeviceList();
    };
  }, []);

  function isDeviceExists(device: Device): boolean {
    const isExists = devices?.current?.some(
      (_device: DeviceType) => _device?.id === device?.id
    );

    return isExists;
  }

  function addDevice(device: Device): void {
    if (
      isDeviceExists(device) ||
      (isEmpty(device?.name) && isEmpty(device?.localName))
    ) {
      return;
    }

    devices.current = [
      ...(devices?.current ?? []),
      {
        id: device?.id,
        name: device?.name,
        localName: device?.localName,
      },
    ];

    props?.updateFoundedDevicesList(devices?.current);
  }

  function resetDeviceList(): void {
    devices.current = [];
  }

  return { devices: devices?.current, addDevice, resetDeviceList };
}

export type { UseBleListReturnType, UseBleListProps };
export { useBleList };
