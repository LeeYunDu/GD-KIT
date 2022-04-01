import { App, Plugin } from 'vue';
import EchartMap from './src/index.vue';

export const EchartMapPlugin: Plugin = {
  install(app: App) {
    app.component('gd-echart-map', EchartMap);
  },
};

export {
  EchartMap,
};
