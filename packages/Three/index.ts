import { App, Plugin } from 'vue';
import Three from './src/index.vue';

export const ThreePlugin: Plugin = {
  install(app: App) {
    app.component('gd-three', Three);
  },
};

export {
  Three,
};
