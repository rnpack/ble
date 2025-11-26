#include <jni.h>
#include "rnpack_bleOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::rnpack_ble::initialize(vm);
}
