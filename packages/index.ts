/* eslint-disable */

/** 
 * !--------- FBI WARNING ----------!
 * 
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import { App, Plugin } from 'vue';

import { TablePlugin } from './Table';
import { EchartMapPlugin } from './EchartMap';
import { ThreePlugin } from './Three';
import { FormPlugin } from './Form';
import { SvgPlugin } from './Svg';
import { UploadFilePlugin } from './UploadFile';
import { TargetSelectPlugin } from './TargetSelect';
import { UploadFileProPlugin } from './UploadFilePro';
import { FileListPlugin } from './FileList';
import { FormItemPlugin } from './FormItem';
import { AmapPlugin } from './Amap';
import { RollListPlugin } from './RollList';
import { DescriptionsPlugin } from './Descriptions';
import { GanttPlugin } from './Gantt';

const GDKitPlugin: Plugin = {
  install(app: App) {
    TablePlugin.install?.(app);
    EchartMapPlugin.install?.(app);
    ThreePlugin.install?.(app);
    FormPlugin.install?.(app);
    SvgPlugin.install?.(app);
    UploadFilePlugin.install?.(app);
    TargetSelectPlugin.install?.(app);
    UploadFileProPlugin.install?.(app);
    FileListPlugin.install?.(app);
    FormItemPlugin.install?.(app);
    AmapPlugin.install?.(app);
    RollListPlugin.install?.(app);
    DescriptionsPlugin.install?.(app);
    GanttPlugin.install?.(app);
  },
};

export default GDKitPlugin;

export * from './Table'
export * from './EchartMap'
export * from './Three'
export * from './Form'
export * from './Svg'
export * from './UploadFile'
export * from './TargetSelect'
export * from './UploadFilePro'
export * from './FileList'
export * from './FormItem'
export * from './Amap'
export * from './RollList'
export * from './Descriptions'
export * from './Gantt'