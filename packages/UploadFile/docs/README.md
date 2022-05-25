<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 文件上传

文件上传组件

## 基础用法
<Preview comp-name="UploadFile" demo-name="demo">
  <demo />
</Preview>

## 属性
参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填
:-: | :-: | :-: | :-: | :-: | :-:
`modelValue` | 双向绑定,文件列表 | Array<'file'> | - | `default` | 否 
`action` | 文件上传服务器地址 | string | - | `default` | 否
`needField` | 最终输出的文件对象所需要的字段 | Array<'string'> | - | `default` | 否
`isView` | 视图模式,只展示文件列表 | boolean | - | `default` | 否
`headers` | 文件上传请求头配置 | Object | - | `default` | 否
`name` | 文件上传字段 | string | - | `default` | 否
`uploadText` | 上传按钮文字 | string | - | `default` | 否
`element组件属性` | 继承element组件属性 | - | - | `default` | 否

