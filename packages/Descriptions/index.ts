import { App, Plugin } from 'vue';
import Descriptions from './src/index.vue';

export const DescriptionsPlugin: Plugin = {
  install(app: App) {
    app.component('gd-descriptions', Descriptions);
  },
};

export {
  Descriptions,
};
