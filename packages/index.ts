/* eslint-disable */

/** 
 * !--------- FBI WARNING ----------!
 * 
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import { App, Plugin } from 'vue';

import { TablePlugin } from './Table';
import { EchartMapPlugin } from './EchartMap';

const GDKitPlugin: Plugin = {
  install(app: App) {
    TablePlugin.install?.(app);
    EchartMapPlugin.install?.(app);
  },
};

export default GDKitPlugin;

export * from './Table'
export * from './EchartMap'