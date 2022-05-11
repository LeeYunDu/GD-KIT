<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 表格

基于element-plus 二次封装的表格组件

## 基础用法
<Preview comp-name="Table" demo-name="demo">
  <demo />
</Preview>

## 属性
参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填
:-: | :-: | :-: | :-: | :-: | :-:
`columns` | 表格列 | Array | - | `[]` | 是
## 事件
事件名 | 说明 | 参数列表 | 参数说明
:-: | :-: | :-: | :-:
`无` | :-: | :-: | :-:


## columns属性
#### columns字段包含了element-plus官网所有字段,以下为拓展字段

参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填
:-: | :-: | :-: | :-: | :-: | :-:
`type` | 列的类型 | String | slot、index、selection | - | 否 
`render` | render的形式生成单元格内容 | Function | - | - | 否
`columns` | 表格列合并 | Array[columns] | - | - | 否
