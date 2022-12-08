import { App, Plugin } from 'vue';
import Amap from './src/index.vue';

export const AmapPlugin: Plugin = {
  install(app: App) {
    app.component('gd-amap', Amap);
  },
};

export {
  Amap,
};
