<template>
  <div>
    <p>双向绑定数组:<span>{{ state.fileList }}</span></p>
    <p>双向绑定数组toJSON: <span>{{ state.fileListToJSON }}</span> </p>
    <p>双向绑定文件名: <span>{{ state.fileNames }}</span> </p>
    <p>双向绑定文件链接集合: <span>{{ state.fileUrls }}</span> </p>

    <h5>功能测试</h5>
    <el-form class="form-view">
      <el-form-item label="容器宽度">
        <el-input v-model="state.width" />
      </el-form-item>
      <el-form-item label="上传形式">
        <el-radio-group v-model="state.uploadType">
          <el-radio label="button">按钮</el-radio>
          <el-radio label="drag">拖拽</el-radio>
          <el-radio label="icon">十字心</el-radio>
          <el-radio label="slot">插槽</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="自动上传">
        <el-switch v-model="state.autoUpload" active-text="开启" inactive-text="关闭" />
      </el-form-item>
      <el-form-item label="文件个数">
        <el-input v-model="state.limit" />
      </el-form-item>
      <el-form-item label="单文件大小限制">
        <el-input v-model="state.limitSize">
          <template #append>M</template>
        </el-input>
      </el-form-item>
      <el-form-item label="文件列表展示形式">
        <el-radio-group v-model="state.listType">
          <el-radio label="list">列表</el-radio>
          <el-radio label="card">卡片</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <div class="test-div" :style="{width:state.width + 'px'}">
      <gd-upload-file-pro
        v-model:value="state.fileList"
        v-model:fileNames="state.fileNames"
        v-model:fileUrls="state.fileUrls"
        v-model:toJSON="state.fileListToJSON"
        :action="state.action"
        :headers="{'Authorization': '1942b0a68a4549bbbc81f59698d70d8c'}"
        name="fileArray"
        :limit-size="state.limitSize"
        :limit="state.limit"
        :domain="state.domain"
        :upload-props="{ url: 'fileUrl', fileName: 'originalFilename' }"
        :auto-upload="state.autoUpload"
        :upload-type="state.uploadType"
        :list-type="state.listType"
        :file-list-props="state.fileListProps"
        @errorMsg="handleErrorMsg"
      >
        <template #default>
          上传插槽 slot #default
        </template>
      <!-- <template #tip="{data}">
        {{ data }}
      </template> -->
      <!-- <template #fileList="{data}">
        <ui-file-list
          :data="data"
          :domain="state.domain"
          :upload-props="{ url: 'fileUrl', fileName: 'originalFilename' }"
        />
      </template> -->
      </gd-upload-file-pro>

      <h5>单独文件列表组件</h5>
      <gd-file-list
        :data="state.fileList"
        :domain="state.domain"
        :upload-props="{ url: 'fileUrl', fileName: 'originalFilename' }"
        :list-type="state.listType"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'

let state = reactive({
  fileList:[
    { fileUrl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',originalFilename:'图片类型文件.jpeg' },
    // { fileUrl:'http://121.40.133.115/digov/data/img/2022/05/%E6%B5%8B%E8%AF%95excel_1653547288870.xlsx',originalFilename:'测试excel.xlsx' },
    // { fileUrl:'http://121.40.133.115/digov/data/img/2022/05/测试文档_1653547341031.docx',originalFilename:'测试文档.docx' },
    // { fileUrl:'http://121.0.133.115/digov/data/img/2022/05/测试压缩包_1653547428325.rar',originalFilename:'测试压缩包.rar' },
    // { fileUrl:'/digov/data/img/2022/05/测试文档_1653893528371.pdf',originalFilename:'测试pdf.pdf' }
  ],
  fileUrls:'',
  fileNames:'',
  fileListToJSON:'',
  action:'/gov_main_api/pc/upload/file',
  domain:'', // http://121.40.133.115:8580,
  drag:false,
  autoUpload:true,
  limit:2,
  limitSize:1,
  listType:'card',
  uploadType:'icon',
  width:'800',
  fileListProps:{
    listClassName:'test-list-name',
    fileItemProps:{
      itemClassName:'test-item-name'
    }
  }
})

function handleErrorMsg (msg){
  ElMessage.error(msg)
}
</script>

<style lang="scss">
.form-view{
  padding: 0 20px;
  width:400px;
}
.test-div{
  width: 800px;
}
</style>
