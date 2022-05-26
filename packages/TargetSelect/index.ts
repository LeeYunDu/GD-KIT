import { App, Plugin } from 'vue';
import TargetSelect from './src/index.vue';

export const TargetSelectPlugin: Plugin = {
  install(app: App) {
    app.component('gd-target-select', TargetSelect);
  },
};

export {
  TargetSelect,
};
