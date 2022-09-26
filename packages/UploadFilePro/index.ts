import { App, Plugin } from 'vue'
import UploadFile from './src/index.vue'

export const UploadFilePlugin: Plugin = {
  install (app: App) {
    app.component('GdUploadFilePro', UploadFile)
  },
}

export {
  UploadFile,
}
