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
`pageSize` | 表格分页 | Number | - | `10` | 否 
`defaultData` | 表格数据 | Array | - | `[]` | 否
`tabelColumn` | 表格列 | Array | - | `[]` | 是
`tableDataApi` | 表格数据请求的接口 | Function | - | - | 否
`tableQuery` | 表格数据请求的接口参数 | Object | - | {current:1,size:10} | 否
`loopKey` | 表格行渲染key值 | String | - | `id` | 否
`pagination` | 是否显示分页 | Boolean | - | `true` | 否

## 事件
事件名 | 说明 | 参数列表 | 参数说明
:-: | :-: | :-: | :-:
`success` | 接口请求数据成功 | data | 接口返回的数据
`changePage` | 分页 | current | 当前页码


## tabelColumn属性
#### tabelColumn字段包含了element-plus官网所有字段,以下为拓展字段

参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填
:-: | :-: | :-: | :-: | :-: | :-:
`slot` | 插槽的形式显示 | Boolean | - | - | 否 
`render` | render的形式生成单元格内容 | Function | - | - | 否
`columns` | 表格列合并 | Array[tabelColumn] | - | - | 否
