package com.cleilsonalvino.notime

import android.os.Bundle // Import necessário para o ciclo de vida
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen // Biblioteca da Splash
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * onCreate é chamado antes de qualquer outra coisa. 
   * É aqui que a animação da Splash Screen é iniciada.
   */
  override fun onCreate(savedInstanceState: Bundle?) {
    // 1. Instala a Splash Screen ANTES do super.onCreate
    installSplashScreen()
    
    // 2. Chama o super enviando null para evitar problemas de reinicialização no Android
    super.onCreate(null)
  }

  /**
   * Retorna o nome do componente principal registrado no JavaScript.
   */
  override fun getMainComponentName(): String = "NotiMe"

  /**
   * Configuração padrão para a nova arquitetura (Fabric) do React Native.
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}