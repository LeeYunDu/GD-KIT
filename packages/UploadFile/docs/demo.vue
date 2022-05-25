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
  fileList:[],
  action:'文件上传地址'
})
</script>
