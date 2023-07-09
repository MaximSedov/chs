import { createApp } from 'vue';
import router from './router';

/* import { initI18n } from '@/i18n'; */

import './style.css';
import App from './App.vue';

import { pinia } from '@/store';
const app = createApp(App);
app.use(pinia);
/* app.use(initI18n()); */
app.use(router);
app.mount('#app');
