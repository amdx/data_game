/*
 * Copyright (C) 2024. Archimedes Exhibitions GmbH,
 * Saarbrücker Str. 24, Berlin, Germany
 *
 * This file contains proprietary source code and confidential
 * information. Its contents may not be disclosed or distributed to
 * third parties unless prior specific permission by Archimedes
 * Exhibitions GmbH, Berlin, Germany is obtained in writing. This applies
 * to copies made in any form and using any medium. It applies to
 * partial as well as complete copies.
 */

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { provideUserConfig } from '@/composables/useUserConfig'
import App from './App.vue'
import router from './router'
import './assets/main.css'

async function setupApp() {
  const app = createApp(App)

  async function setupI18n() {
    const response = await fetch('i18n.json')
    const i18nData = await response.json()

    return createI18n({
      locale: 'de',
      messages: i18nData,
      legacy: false
    })
  }

  const i18n = await setupI18n()

  // Load user config from config.json
  await provideUserConfig(app)

  app.use(i18n)
  app.use(router)

  app.mount('#app')
}

setupApp()