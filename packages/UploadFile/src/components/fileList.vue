<template>
  <div v-if="fileList.length > 0" class="file-table-view">
    <el-table :data="fileList" style="width: 100%;" :show-header="false">
      <el-table-column prop="fileName" label="文件名">
        <template #default="scope">
          <div class="file-cell">
            <img class="file-type-icon" :src="getFileIcon(scope.row[uploadProps.url||'fileUrl'])" alt="">
            <div class="file-name" @click="handleOpenFile(scope.row)">
              <span>{{ scope.row[uploadProps.fileName]||'' }}</span>
            </div>
            <el-image
              v-if="zoomImg&&IMAGE_TYPE_GROUP.includes(getFileType(scope.row[uploadProps.url]))"
              class="file-img-zoom"
              style="width: 100px; height: 100px"
              :src="scope.row[uploadProps.url]"
              fit="fill"
              @click="handleOpenFile(scope.row)"
            >
              <template #error>
                <div class="failed-img"><img src="../static/images/icon-failed.png" alt=""></div>
              </template>
            </el-image>
            <div class="action-group">
              <el-button
                v-if="previewButton(scope.row)"
                size="small"
                @click="handleOpenFile(scope.row)"
              >
                预览
              </el-button>
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
            </div>
          </div>
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
  },
  uploadProps:{
    type:Object,
    default:()=>({ url: 'fileUrl', fileName: 'originalFilename' })
  },
  previewType:{
    type:Array,
    default:()=> ['doc', 'docx', 'pdf', 'png', 'jpeg', 'jpg','svg']
  },
  zoomImg:{
    type:Boolean,
    default:true
  }
})

const emit = defineEmits(['delete'])


const IMAGE_TYPE_GROUP = ['png', 'jpeg', 'jpg', 'gif','svg']
const DOC_TYPE_GROUP = ['doc','docx','pdf']

let that =  reactive({
  showViewer: false,
  urlList: [],
} as any)


/**
 * 文件预览
 * @param file
 */
const handleOpenFile = (file:any) => {
  // 文件预览分类,如果是图片类型直接采用element-plus的预览方式,如果是文档形式则以新标签的形式打开
  let url = file[props.uploadProps.url]
  const fileType = getFileType(url)
  // 图片预览
  if (IMAGE_TYPE_GROUP.includes(fileType)) {
    that.urlList = [url]
    that.showViewer = true
  } else if (DOC_TYPE_GROUP.includes(fileType)) {
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
  if(filePath===''){
    return ''
  }
  const index = filePath.lastIndexOf('.')
  const fileType = filePath.slice(index + 1, filePath.length).toLowerCase()
  return fileType
}

/**
 * 获取文件icon
 */
const getFileIcon = (filePath:string) => {
  let type = getFileType(filePath)
  let result = ''
  if(['png', 'jpeg', 'jpg'].includes(type)){
    result =  'img'
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
    result = type
  }
  try {
    return new URL(`../static/images/icon-${result}.png`, import.meta.url).href
  } catch (error) {
    return new URL(`../static/images/icon-other.png`, import.meta.url).href
  }
}


/**
 * 文件预览按钮是否显示
 * @param file
 */
const previewButton = (file:any) => {
  const canPreview = props.previewType||[]
  let url = file[props.uploadProps.url]
  const fileType = getFileType(url)
  try {
    return canPreview.includes(fileType)
  } catch (error) {
    return false
  }

}

/**
 * 文件删除
 * @param index
 */
const handleEntityFileDelete = (index:number) => {
  emit('delete', index)
}

/**
 * 文件下载
 * @param file
 */
const handleDownloadFile = (file:any) => {
  try {
    download(file[props.uploadProps.url], file[props.uploadProps.fileName])
  } catch (error) {
  }
}


</script>
<style lang="scss" scoped>
.file-table-view{
  .file-cell{
    display: flex;
    align-items: center;
    .file-type-icon{
      margin-right: 20px;
    }
    .file-name{
      flex: 1;
      cursor: pointer;
      color: #409eff;
    }
    .file-img-zoom{
      width: 100px;
      height: 100px;
      cursor: pointer;
      margin-right: 20px;
      .failed-img{
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: auto;
      }
    }
  }
}
</style>
