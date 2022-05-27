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
`modelValue` | 双向绑定,文件列表 | Array<后端返回文件对象> | - | - | 否 
`fileNames` | 双向绑定,文件名称集合 | string | - | - | 否 
`fileUrls` | 双向绑定,文件地址集合 | string | - | - | 否 
`toJSON` | 双向绑定,文件列表JSON格式 | string | - | - | 否 
`action` | 文件上传服务器接口地址 | string | - | - | 否
`domin` | 文件服务器域名 | string | - | - | 否
`limitSize` | 文件大小限制 | number | - | 5M | 否
`uploadProps` | 文件字段配置选项 | Object | - | { url: 'fileUrl', fileName: 'originalFilename' } | 否
`isView` | 视图模式,只展示文件列表 | boolean | - | `default` | 否
`previewType` | 可预览的文件类型 | boolean | - | ['doc', 'docx', 'pdf', 'png', 'jpeg', 'jpg'] | 否
`zoomImg` | 图片文件是否缩略图展示 | boolean | - | false | 否
`headers` | 文件上传请求头配置 | Object | - | `default` | 否
`name` | 文件上传字段 | string | - | `default` | 否
`uploadText` | 上传按钮文字 | string | - | `default` | 否
`element组件属性` | 继承element组件属性 | - | - | `default` | 否

## 插槽
参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填
:-: | :-: | :-: | :-: | :-: | :-:
`tip` | 上传提示 | -  | - | - | 否 
`default` | 默认内容 | -  | - | - | 否 
`fileList` | 文件上传列表 | -  | - | - | 否 