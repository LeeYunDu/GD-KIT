<template>
  <template v-if="listType==='list'">
    <div class="file-item-view">
      <div class="file-item-cell">
        <FileIcon :url="cUrl" />
        <div class="file-item-name">
          {{ row[uploadProps.fileName]||row.name }}
        </div>

        <ZoomImg
          v-if="showZoomImg"
          :url="cUrl"
          @openFile="handleOpenFile"
        />
        <div v-if="builtIn" class="file-item-status">
          {{ that.statusMap[row.status] }}
        </div>
        <div class="action-group">
          <el-button
            v-if="previewButton()"
            size="small"
            @click="handleOpenFile"
          >
            预览
          </el-button>
          <el-button
            v-if="showDownLoadButton"
            type="primary"
            size="small"
            class="button"
            @click="handleDownloadFile(row)"
          >
            下载
          </el-button>
          <el-button
            v-if="!view"
            type="danger"
            size="small"
            @click="handleEntityFileDelete()"
          >
            删除
          </el-button>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div :class="['file-card-item',itemClassName]">
      <div
        class="file-card-view"
        @mouseover="that.showMaskLayer=true"
        @mouseleave="that.showMaskLayer=false"
      >
        <img
          class="file-card-image"
          :src="cUrl"
          alt=""
          @error="handleError"
        >

        <div v-if="that.showMaskLayer" class="mask-layer">
          <div class="file-name">{{ row[uploadProps.fileName]||row.name }}</div>
          <div class="action-group">
            <span v-if="showDownLoadButton" class="action-icon" @click="handleDownloadFile(row)">下载</span>
            <span v-if="previewButton()" class="action-icon" @click="handleOpenFile">预览</span>
            <span v-if="!view" class="action-icon" @click="handleEntityFileDelete()">删除</span>
          </div>
        </div>
        <div v-if="builtIn" :class="['file-status',`file-status-${row.status}`]"> {{ that.statusMap[row.status] }}</div>
      </div>
    </div>
  </template>

  <ElImageViewer
    v-if="that.showViewer"
    :url-list="that.urlList"
    @close="that.showViewer=false"
  />
</template>
<script lang="ts" setup>
import { computed, inject, reactive } from 'vue'
import { getFileType } from '../units'
import download from '../units/download'
import FileIcon from './FileIcon.vue'
import ZoomImg from './ZoomImg.vue'


const props = defineProps({
  index:{
    type:Number,
  },
  row:{
    type:Object,
    default:()=>({})
  },
  previewType:{
    type:Array,
    default:()=> [ 'pdf', 'png', 'jpeg', 'jpg','svg']
  },
  btns:{
    type:Array,
    default:()=>['preview','delete','download']
  },
  zoomImg:{
    type:Boolean,
    default:true
  },
  view:{
    type:Boolean,
    default:true
  },
  listType:{
    type:String
  },
  itemClassName:{
    type:String,
    default:''
  }
})

/**
 * inject
 */
let uploadProps:any = inject('uploadProps')
let domain:string = inject('domain')
let builtIn:boolean = inject('builtIn')

let that = reactive({
  urlList:[],
  showViewer:false,
  showMaskLayer:false,
  statusMap:{
    'success':'成功',
    'ready':'未上传',
  }
} as any)

/**
 * computed
 */
let cUrl = computed(()=>{
  if(builtIn&&props.row.status=='ready'){
    return  handleReadyFile()
  }else{
    return domain + props.row[uploadProps.url]
  }
})

let cType = computed(()=>{
  if(builtIn){
    let name = props.row[uploadProps.fileName]||props.row.name
    return getFileType(name)
  }else{
    return getFileType(props.row[uploadProps.url])
  }
})

const showZoomImg = computed(()=>{
  return props.zoomImg&&IMAGE_TYPE_GROUP.includes(cType.value)
})

const showDownLoadButton = computed(()=>{
  if(builtIn){
    return props.row.status==='success'
  }else{
    return true
  }
})

const emit = defineEmits(['delete'])
/**
 * 文件预览按钮是否显示
 * @param file
 */
const previewButton = () => {
  const canPreview = props.previewType
  const fileType = cType.value
  try {
    return canPreview.includes(fileType)
  } catch (error) {
    return false
  }

}

/**
 * 文件预览
 * 文件预览分类,如果是图片类型直接采用element-plus的预览方式,如果是文档形式则以新标签的形式打开
 * @param file
 */

const IMAGE_TYPE_GROUP = ['png', 'jpeg', 'jpg', 'gif','svg']
const DOC_TYPE_GROUP = ['pdf']

const handleOpenFile = () => {
  let url = ''
  if(builtIn&&props.row.status=='ready'){
    // ready 状态下预览文件
    url = handleReadyFile()
  }else{
    url = cUrl.value
  }
  const fileType = cType.value

  // 图片预览
  if (IMAGE_TYPE_GROUP.includes(fileType)) {
    that.urlList = [url]
    that.showViewer = true
  } else if (DOC_TYPE_GROUP.includes(fileType)) {
    window.open(url)
  }
}

const handleReadyFile = ()=>{
  let result = URL.createObjectURL((props.row.raw as any))
  return result
}

function handleError (e){
  e.target.src = new URL(`../static/images/icon-failed2.png`, import.meta.url).href
}

/**
 * 文件下载
 * @param file
 */
const handleDownloadFile = (file:any) => {
  let url = cUrl.value
  try {
    download(url, file[uploadProps.fileName])
  } catch (error) {
  }
}


/**
 * 文件删除
 */
const handleEntityFileDelete = () => {
  let result = confirm('是否删除该文件')
  result&&emit('delete', props.index)
}
</script>
<style lang="scss" scoped>
.file-item-view{
  padding: 8px 0 ;
  background: #ffffff;
  border-bottom: 1px solid rgb(235, 238, 245);
  &:hover{
    background: rgb(245, 247, 250);
  }
  .file-item-cell {
    display: flex;
    align-items: center;
    padding: 0 12px;
    box-sizing: border-box;
    .file-item-name{
      color: #409eff ;
      cursor: pointer;
      font-size: 14px;
      flex: 1;
    }
    .file-item-status{
      margin-right: 20px;
      font-size: 12px;
    }
    .action-group{
      flex: 0 0 170px;
      text-align: right;
    }
  }
}

.file-card-item{
  width: 150px;
  height: 150px;
  padding: 8px;
  box-sizing: border-box;
  .file-card-view{
    width: 100%;
    height: 100%;
    border-radius: 6px;
    border: 1px solid #cdd0d6;
    overflow: hidden;
    position: relative;
  }
  .file-card-image{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 0;
  }
  .file-status{
    position: absolute;
    z-index: 20;
    width: 100px;
    height: 20px;
    line-height: 20px;
    top: 0px;
    right:-25px;
    transform: rotate(45deg);
    text-align: center;
    box-sizing: border-box;
    padding-left: 20px;
    font-size: 12px;
  }
  .file-status-success{
    background: #67C23A;
  }
  .file-status-ready{
    background: #409EFF;
  }
  .mask-layer{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    background: rgba($color: #000000, $alpha: 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 14px;
    color: white;
    padding: 0 8px;
    box-sizing: border-box;
    animation: maskIn 1s  forwards;
    .file-name{
      margin-bottom: 10px;
      text-align: center;
    }
    .action-group{

      .action-icon{
        cursor: pointer;
        &:hover{
          color: #409eff;
        }
      }
      .action-icon~.action-icon{
        margin-left: 10px;
      }
    }
  }
}

@keyframes maskIn{
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
</style>
