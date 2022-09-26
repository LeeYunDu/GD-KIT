<template>
  <div>
    1
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'



let state = reactive({
  fileList:[
    { fileUrl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',originalFilename:'图片类型文件.jpeg' },
    { fileUrl:'http://121.40.133.115/digov/data/img/2022/05/%E6%B5%8B%E8%AF%95excel_1653547288870.xlsx',originalFilename:'测试excel.xlsx' },
    { fileUrl:'http://121.40.133.115/digov/data/img/2022/05/测试文档_1653547341031.docx',originalFilename:'测试文档.docx' },
    { fileUrl:'http://121.40.133.115/digov/data/img/2022/05/测试压缩包_1653547428325.rar',originalFilename:'测试压缩包.rar' },
  ],
  fileUrls:'',
  fileNames:'',
  fileListToJSON:'',
  action:'文件上传地址',
  domain:'http://121.40.133.115'
})
</script>
