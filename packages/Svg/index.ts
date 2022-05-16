import { App, Plugin } from 'vue';
import Svg from './src/index.vue';

export const SvgPlugin: Plugin = {
  install(app: App) {
    app.component('gd-svg', Svg);
  },
};

export {
  Svg,
};
