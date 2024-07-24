
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNBleSpec.h"

@interface Ble : NSObject <NativeBleSpec>
#else
#import <React/RCTBridgeModule.h>

@interface Ble : NSObject <RCTBridgeModule>
#endif

@end
