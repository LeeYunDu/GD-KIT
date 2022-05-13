<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 表单

表单工厂模式

## 基础用法
<Preview comp-name="Form" demo-name="demo">
  <demo />
</Preview>

## 属性
参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填
:-: | :-: | :-: | :-: | :-: | :-:
`model` | 字段集合 | object | - | `-` | 否 
`labels` | 字段配置 | Array<'fieldItem'> | - | `-` | 否 
`formProps` | el-form配置 | object | - | `-` | 否 
`gridProps` | el-row配置 | object | - | `-` | 否 

## fieldItem 
参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填
:-: | :-: | :-: | :-: | :-: | :-:
`label` | 字段名称 | string | - | `-` | 否 
`type` | 组件类型 | string | el-[type]或slot | `input` | 否 
`prop` | 字段key | string | - | `-` | 否 
`gridProps` | el-col配置 | object | - | `-` | 否 
`formItemProps` | el-form-item配置 | object | - | `-` | 否 
`inputProps` | 表单组件配置 | object | - | `-` | 否 

## 事件
事件名 | 说明 | 参数列表 | 参数说明
:-: | :-: | :-: | :-:
`changeBus` | 表单组件的change事件 | {type,value} | type:表单的prop值,value:数值
## 方法
事件名 | 说明 | 参数列表 | 参数说明
:-: | :-: | :-: | :-:
`validate` | 表单验证 | - | -
`resetFields` | 表单重置 | - | -
