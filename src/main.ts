/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Composables
import { createApp } from 'vue'
import { createRulesPlugin } from 'vuetify/lib/labs/rules/index.js'

// Plugins
import { registerPlugins } from '@/plugins/index.js'

import vuetify from '@/plugins/vuetify.js'

// Components
import App from './App.vue'
// Styles
import 'unfonts.css'

const app = createApp(App)

app.use(createRulesPlugin({ /* options */}, vuetify.locale))
registerPlugins(app)

app.mount('#app')
