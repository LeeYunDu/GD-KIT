import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/markdown.css'

import MyKit from '../packages'
import Preview from './components/Preview.vue'

const app = createApp(App)

/**
 * 引入 element-plus
 */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
app.use(ElementPlus, { locale })


app.component('Preview', Preview)
app.use(MyKit).use(router).mount('#app')
