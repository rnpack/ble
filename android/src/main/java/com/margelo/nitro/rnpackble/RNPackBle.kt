package com.margelo.nitro.rnpackble
  
import com.facebook.proguard.annotations.DoNotStrip

@DoNotStrip
class RNPackBle : HybridRNPackBleSpec() {
  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }
}
