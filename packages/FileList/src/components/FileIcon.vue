<template>
  <div class="file-type-icon">
    <img
      class="file-icon"
      :src="getFileIcon(url)"
      alt=""
      @error="handleError"
    >
  </div>
</template>

<script lang="ts" setup>
import { getFileType } from '../units'
let props = defineProps({
  url:{
    type:String,
    default:'',
  },
})
/**
 * 获取文件icon
 */
const getFileIcon = (filePath:string) => {
  let type = getFileType(filePath)
  let result = ''
  if(['png', 'jpeg', 'jpg'].includes(type)){
    result =  'img'
  } else if(['gif'].includes(type)){
    result =  'gif'
  } else if(['doc','docx'].includes(type)){
    result = 'doc'
  } else if(['xls','xlsx'].includes(type)){
    result = 'excel'
  }else if(['rar','zip'].includes(type)){
    result = 'zip'
  }else if(['mp3','mp4'].includes(type)){
    result = 'mp3'
  }else if(['avi'].includes(type)){
    result = 'video'
  }else{
    result = 'other'
  }
  return new URL(`../static/images/icon-${result}.png`, import.meta.url).href
}



// 图片加载失败处理
function handleError (e){
  e.target.src = new URL(`../static/images/icon-other.png`, import.meta.url).href
}
</script>

<style lang="scss">
.file-type-icon{
  margin-right: 20px;
}
</style>
