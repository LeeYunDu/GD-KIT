import { App, Plugin } from 'vue';
import FormItem from './src/index.vue';

export const FormItemPlugin: Plugin = {
  install(app: App) {
    app.component('gd-form-item', FormItem);
  },
};

export {
  FormItem,
};
