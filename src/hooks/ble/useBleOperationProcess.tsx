import { useEffect, useRef, useState } from 'react';
import { useTimer, structuredClone } from '@rnpack/utils';

interface ProcessBleOperationArgs {
  operation: Array<string>;
}

interface UseBleOperationProcessReturns {
  procesBleOperation: (args: ProcessBleOperationArgs) => void;
  stopBleResponseTimer: () => void;
  processBleOperationMessage: (args: { isNext: boolean }) => Promise<void>;
  onReceivedBleResponse: () => Promise<void>;
}

interface UseBleOperationProcessProps {
  sendMessageToBle: (message: string) => Promise<void>;
  onNoResponse: (message: string) => void;
  bleResponseWaitTimeLimit: number;
}

function useBleOperationProcess(
  props: UseBleOperationProcessProps
): UseBleOperationProcessReturns {
  const operation = useRef<Array<string>>();
  const hasMessageSent = useRef<boolean>(false);

  const [bleResponseDuration, setBleResponseDuration] = useState<number>();

  const { minutes, seconds } = useTimer({
    targetDate: bleResponseDuration,
    timeInterval: 1000,
  });

  useEffect(() => {
    mount();

    return () => {
      unmount();
    };
  }, []);

  useEffect(() => {
    console.info('Remaing time for ble response: ', { minutes, seconds });
    if (minutes <= 0 && seconds <= 0 && hasMessageSent?.current) {
      if (operation?.current?.[0]) {
        props?.onNoResponse(operation?.current[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes, seconds]);

  async function mount(): Promise<void> {}
  async function unmount(): Promise<void> {}

  function getDuration(): number {
    const now = new Date();
    const time = new Date(now?.getTime() + props?.bleResponseWaitTimeLimit);
    return time?.getTime();
  }

  function procesBleOperation(args: ProcessBleOperationArgs): void {
    operation.current = structuredClone(args?.operation) as Array<string>;

    processBleOperationMessage({ isNext: false });
  }

  async function processBleOperationMessage(args: {
    isNext: boolean;
  }): Promise<void> {
    if (!operation?.current) {
      console.info('Invalid operations');
      return;
    }

    if (!(operation?.current?.length > 0)) {
      console.info('No operations found');
      return;
    }

    if (args?.isNext) {
      operation.current.shift();
    }

    if (!(operation?.current?.length > 0)) {
      console.info('No next operation found');
      return;
    }

    const message = operation?.current?.[0];

    if (message) {
      hasMessageSent.current = true;

      await props?.sendMessageToBle(message);

      startBleResponseTimer();
    }
  }

  function startBleResponseTimer(): void {
    const duration: number = getDuration();

    setBleResponseDuration(duration);
  }

  function stopBleResponseTimer(): void {
    setBleResponseDuration(undefined);
  }

  async function onReceivedBleResponse(): Promise<void> {
    hasMessageSent.current = false;

    await processBleOperationMessage({ isNext: true });
  }

  return {
    procesBleOperation,
    stopBleResponseTimer,
    processBleOperationMessage,
    onReceivedBleResponse,
  };
}

export type { UseBleOperationProcessProps, UseBleOperationProcessReturns };
export { useBleOperationProcess };
