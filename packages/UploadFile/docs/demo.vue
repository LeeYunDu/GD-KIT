<template>
  <div>
    <gd-upload-file
      v-model:value="state.fileList"
      :action="state.action"
      :headers="{'Authorization': 'token'}"
      name="file"
      :need-field="['url','fileName']"
    />
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'



let state = reactive({
  fileList:[
    { url:'xx.png',fileName:'网络图片1.png' },
    { url:'xx.png',fileName:'网络图片2.png' },
    { url:'xx.png',fileName:'网络图片3.png' },
  ],
  action:'文件上传地址'
})
</script>
