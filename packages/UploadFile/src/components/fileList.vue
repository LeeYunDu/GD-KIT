<template>
  <div v-if="fileList.length > 0" class="file-table-view">
    <el-table :data="fileList" style="width: 100%;" :show-header="false">
      <el-table-column prop="fileName" label="文件名">
        <template #default="scope">
          <el-button
            size="small"
            type="text"
            class="nameButton"
            :title="scope.row.fileName"
            @click="handleOpenFile(scope.row)"
          >
            <span>{{ scope.row.fileName }}</span>
          </el-button>
          <el-button v-if="previewButton(scope.row)" size="small" @click="handleOpenFile(scope.row)">预览</el-button>
          <el-button
            type="primary"
            size="small"
            class="button"
            @click="handleDownloadFile(scope.row)"
          >
            下载
          </el-button>
          <template v-if="!view">
            <el-button type="danger" size="small" @click="handleEntityFileDelete(scope.$index)">删除</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <ElImageViewer
    v-if="that.showViewer"
    :url-list="that.urlList"
    @close="that.showViewer=false"
  />
</template>

<script lang="ts" setup>
import { ElImageViewer, ElMessage } from 'element-plus'
import { reactive } from 'vue'
import download from '../units/download'

const props = defineProps({
  fileList: {
    type: Array,
    default: () => []
  },
  view:{
    type:Boolean,
    default:false,
  }
})

const emit = defineEmits(['handleEntityFileDelete'])

let that =  reactive({
  showViewer: false,
  urlList: [],
  baseUrl:`/sos-files/allowFile/`
} as any)


/**
 * 文件预览
 * @param file
 */
const handleOpenFile = (file:any) => {
  // 文件预览分类,如果是图片类型直接采用element-plus的预览方式,如果是文档形式则以新标签的形式打开
  const { url } = file
  const fileType = getFileType(url)
  // 图片预览
  if (['png', 'jpeg', 'jpg', 'gif'].includes(fileType)) {
    that.urlList = [url]
    that.showViewer = true
  } else if (['doc', 'docx', 'pdf'].includes(fileType)) {
    // 文件预览,关于PDF页面内直接预览 需要通过office365服务,然后在iframe的方式打开
    window.open(url)
  } else {
    ElMessage.info('不支持该类型文件预览')
  }
}

/**
 * 获取文件类型
 * @param filePath
 */
const getFileType = (filePath:string) => {
  const index = filePath.lastIndexOf('.')
  const fileType = filePath.slice(index + 1, filePath.length).toLowerCase()
  return fileType
}

/**
 * 文件预览按钮是否显示
 * @param file
 */
const previewButton = (file:any) => {
  const canPreview = ['doc', 'docx', 'pdf', 'png', 'jpeg', 'jpg']
  const { url } = file
  const fileType = getFileType(url)
  return canPreview.includes(fileType)
}

/**
 * 文件删除
 * @param index
 */
const handleEntityFileDelete = (index:number) => {
  emit('handleEntityFileDelete', index)
}

/**
 * 文件下载
 * @param file
 */
const handleDownloadFile = (file:any) => {
  const { filePath } = file
  download(that.baseUrl + filePath, file.fileName)
}

</script>
<style lang="scss" scoped>
.file-table-view{

}
</style>
