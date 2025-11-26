package com.margelo.nitro.rnpack.ble
  
import com.facebook.proguard.annotations.DoNotStrip

@DoNotStrip
class Ble : HybridBleSpec() {
  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }
}
