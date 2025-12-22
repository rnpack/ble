#include <jni.h>
#include "rnpackbleOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::rnpackble::initialize(vm);
}
