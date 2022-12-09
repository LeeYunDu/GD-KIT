import { App, Plugin } from 'vue';
import RollList from './src/index.vue';

export const RollListPlugin: Plugin = {
  install(app: App) {
    app.component('gd-roll-list', RollList);
  },
};

export {
  RollList,
};
