import { App, Plugin } from 'vue';
import Gantt from './src/index.vue';

export const GanttPlugin: Plugin = {
  install(app: App) {
    app.component('gd-gantt', Gantt);
  },
};

export {
  Gantt,
};
