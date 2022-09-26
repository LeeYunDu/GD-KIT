<template>
  <div
    v-if="data.length>0"
    :class="[listType==='list'?'':'file-card-list',listClassName]"
  >
    <FileItem
      v-for="(item,index) in data"
      :key="index"
      :row="item"
      :index="index"
      :list-type="listType"
      v-bind="Object.assign($attrs,fileItemProps)"
      @delete="handleEntityFileDelete"
    />
  </div>
</template>

<script lang="ts" setup>
import { provide, reactive } from 'vue'
import FileItem from './components/FileItem.vue'
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  uploadProps:{
    type:Object,
    default:()=>({ url: 'fileUrl', fileName: 'originalFilename' })
  },
  // 添加域名配置,因为有些接口数据返回只有文件地址,需要拼接域名
  domain:{
    type:String,
    default:''
  },
  // 是否内置于ui-upload 组件内
  builtIn:{
    type:Boolean,
    default:false
  },
  listType:{
    type:String,
    default:'list' // list | card
  },
  fileItemProps:{
    type:Object,
    default:()=>({})
  },
  listClassName:{
    type:String,
    default:''
  }
})

let that =  reactive({
  fileList:props.data
} as any)

/**
 * provide
 */
provide('uploadProps',props.uploadProps)
provide('domain',props.domain)
provide('builtIn',props.builtIn)

function handleEntityFileDelete (index){
  that.fileList.splice(index, 1)
}
</script>
<style lang="scss" scoped>
.file-card-list{
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 3px;
  padding: 8px;
  margin-left: -8px;
  margin-right: -8px;
}


</style>
