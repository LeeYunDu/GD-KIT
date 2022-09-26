import { App, Plugin } from 'vue';
import FileList from './src/index.vue';

export const FileListPlugin: Plugin = {
  install(app: App) {
    app.component('gd-file-list', FileList);
  },
};

export {
  FileList,
};
