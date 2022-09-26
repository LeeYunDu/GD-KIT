import { App, Plugin } from 'vue';
import UploadFilePro from './src/index.vue';

export const UploadFileProPlugin: Plugin = {
  install(app: App) {
    app.component('gd-upload-file-pro', UploadFilePro);
  },
};

export {
  UploadFilePro,
};
