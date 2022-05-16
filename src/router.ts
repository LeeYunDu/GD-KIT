/* eslint-disable prettier/prettier */

/** 
 * !--------- FBI WARNING ----------!
 * 
 * 根据 /packages 目录下的组件所生成的组件类侧边导航栏配置，请勿手动修改
 */

 import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'

 const routes = [{
    title: '表格',
    name: 'Table',
    path: '/components/Table',
    component: () => import('packages/Table/docs/README.md'),
  },{
    title: 'Echart地图',
    name: 'EchartMap',
    path: '/components/EchartMap',
    component: () => import('packages/EchartMap/docs/README.md'),
  },{
    title: 'Three.js',
    name: 'Three',
    path: '/components/Three',
    component: () => import('packages/Three/docs/README.md'),
  },{
    title: '表单',
    name: 'Form',
    path: '/components/Form',
    component: () => import('packages/Form/docs/README.md'),
  },{
    title: 'Svg',
    name: 'Svg',
    path: '/components/Svg',
    component: () => import('packages/Svg/docs/README.md'),
  }];
 
 const routerConfig = {
   history: createWebHashHistory(),
   routes,
   scrollBehavior(to: any, from: any) {
     if (to.path !== from.path) {
       return { top: 0 };
     }
   },
 };
 
 const router = createRouter(routerConfig as RouterOptions);
 
 export default router;
