/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import {registerPlugins} from '@/plugins/index.js'
import vuetify from '@/plugins/vuetify.js'

// Components
import App from './App.vue'

// Composables
import {createApp} from 'vue'

// Styles
import 'unfonts.css'
import {createRulesPlugin} from "vuetify/lib/labs/rules/index.js";

const app = createApp(App)

app.use(createRulesPlugin({ /* options */}, vuetify.locale))
registerPlugins(app)

app.mount('#app')
