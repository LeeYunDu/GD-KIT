<template>
  <div class="upload-file-view">
    <div class="upload-cell">
      <el-upload
        ref="uploadRef"
        class="upload-file-tool"
        :drag="cDrag"
        :action="action"
        :multiple="multiple"
        :limit="limit"
        :headers="headers"
        :with-credentials="true"
        :accept="accept"
        :show-file-list="false"
        :before-upload="handleBeforeUpload"
        :on-progress="handleProgress"
        :on-success="handleSuccess"
        :on-error="handleError"
        :on-exceed="handleExceed"
        :on-remove="handleRemove"
        :file-list="that.fileList"
        v-bind="$attrs"
        :auto-upload="autoUpload"
      >
        <!-- 上传交互模式：拖拽文件形式 或  按钮点击模式 -->
        <template v-if="cDrag">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处或 <em>点击此处上传</em>
          </div>
        </template>
        <template v-else-if="uploadType==='button'">
          <el-button type="primary" size="small">{{ uploadText }}</el-button>
        </template>
        <template v-else-if="uploadType==='icon'">
          <div class="upload-cross-furrow"></div>
        </template>
        <template v-else-if="uploadType==='slot'">
          <slot name="default"></slot>
        </template>
      </el-upload>
      <el-button
        v-if="!autoUpload"
        class="upload-server-button"
        type="success"
        size="small"
        @click="handleUpload"
      >
        上传到服务器
      </el-button>
    </div>
    <slot name="tip" :data="{accept,limitSize}">
      <div class="upload-tip">
        支持<span class="hight-light">{{ accept }}</span>,
        <span class="hight-light">{{ limitSize }}</span>M以内
      </div>
    </slot>
    <!-- 上传进度条动画 -->
    <div v-if="fileProgress.showPercentage" class="progress-box">
      <el-progress
        :percentage="fileProgress.percentageNumber"
        :status="fileProgress.percentageState"
      />
    </div>
    <slot name="fileList" :data="that.fileList">
      <GdFileList
        :data="that.fileList"
        :domain="domain"
        :upload-props="uploadProps"
        :built-in="true"
        :view="false"
        :list-type="listType"
        v-bind="fileListProps"
      />
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { computed,reactive, shallowRef, watch } from 'vue'

const props = defineProps({
  value: {
    type: Array,
    default: ()=>[]
  },
  fileNames:{
    type:String,
    default:''
  },
  fileUrls:{
    type:String,
    default:''
  },
  // 服务器地址
  domain:{
    type:String,
    default:''
  },
  // 接口地址
  action:{
    type:String,
    default:``
  },
  // 是否上传多个文件
  multiple: {
    type: Boolean,
    default: true
  },
  // 文件上传个数限制
  limit: {
    type: Number,
    default: null
  },
  limitSize:{
    type:Number,
    default:5
  },
  headers:{
    type:Object,
    default:()=>({
      'Authorization': 'token'
    })
  },
  // 文件上传接受的文件格式类型
  accept: {
    type: String,
    default: '.doc,.docx,.pdf,.xls,.xlsx,.jpg,.jpeg,.png,.ceb,.tiff,.txt,.otf'
  },
  uploadText:{
    type:String,
    default:'上传文件'
  },
  uploadProps:{
    type:Object,
    default:()=>({ url: 'fileUrl', fileName: 'originalFilename' })
  },
  autoUpload:{
    type:Boolean,
    default:true
  },
  listType:{
    type:String,
    default:'list' // list | card
  },
  uploadType:{
    type:String,
    default:'button'
  },
  // 文件列表组件属性配置
  fileListProps:{
    type:Object,
    default:()=>({})
  }
})

const  uploadRef = shallowRef<any>()

const that = reactive({
  fileList: []
} as any)

/**
 * computed
 */

let cDrag = computed(()=>{
  return props.uploadType==='drag'
})

const emit = defineEmits([
  'errorMsg',
  'update:value',
  'update:fileUrls',
  'update:fileNames',
  'update:toJSON',
])

function init (){
  try {
    if (props.value.length > 0) {
      that.fileList = deepCopy(props.value)
    }
  } catch (error) {
    that.fileList = []
  }
}
init()

// 监听文件列表变化,抛出结果
watch(that.fileList, (file:any) => {
  let fileUrls:Array<any> = []
  let fileNames:Array<any> = []
  file.forEach((element:any) => {
    fileUrls.push(element[props.uploadProps.url]||'')
    fileNames.push(element[props.uploadProps.fileName]||'')
  })
  let successFileList = file.filter(e=>{
    return e.status ==='success'
  })
  let VModelData = successFileList.map(e=>{
    return {
      [props.uploadProps.url]:e[props.uploadProps.url],
      [props.uploadProps.fileName]:e[props.uploadProps.fileName],
    }
  })
  emit('update:value',VModelData )
  emit('update:toJSON',JSON.stringify(VModelData) )
  emit('update:fileNames',fileNames.join(','))
  emit('update:fileUrls',fileUrls.join(','))
},{ immediate:true })
/**
 * 文件上传前拦截
 * @param file
 */
const handleBeforeUpload = async  (file:any) => {
  const filePath = file[props.uploadProps.url]||''
  const index = filePath.lastIndexOf('.')
  const fileType = filePath.slice(index, filePath.length).toLowerCase()
  let FILE_SIZE_COUNT = props.limitSize
  const isLimit = file.size / 1024 / 1024 < FILE_SIZE_COUNT // 限制文件大小
  // 文件类型上传判断处理
  if (!props.accept.includes(fileType)) {
    emit('errorMsg','不支持该类型文件上传')
    return false
  }
  if (!isLimit) {
    emit('errorMsg',`不支持文件大小超过${FILE_SIZE_COUNT}M`)
    return false
  }
  return true
}

/**
 * 文件上传时
 */
const fileProgress = reactive({
  showPercentage: false, // 是否显示
  percentageState: null, // 上传状态
  percentageTime: undefined, // 上传动画定时器
  percentageNumber: 0

} as any)
const handleProgress = () => {
  fileProgress.showPercentage = true
  fileProgress.percentageState = null
  fileProgress.percentageNumber = 0
  fileProgress.percentageTime = setInterval(() => {
    const speed = Number((100 - fileProgress.percentageNumber) / 10)
    fileProgress.percentageNumber = parseInt((fileProgress.percentageNumber + speed) as any)
  }, 500) as any
}


/**
 * 文件上传成功
 * @param response
 * @param file
 * @param fileList
 */
const handleSuccess = (response:any, upfile:any, fileList:Array<any>):void => {
  // 清除动画定时器
  clearInterval(fileProgress.percentageTime)
  fileProgress.percentageNumber = 100
  fileProgress.percentageState = ('success') as any
  setTimeout(() => {
    fileProgress.showPercentage = false
  }, 1000)
  // 文件存储
  response.data.resultList.forEach((file:any)=>{
    // 手动上传模式需要根据组件内置的uid 找到对应下标替换成上传成功的文件数据结构
    let fileIndex = fileList.findIndex(e=>{
      return e.uid == upfile.uid
    })
    if(fileIndex>-1){
      that.fileList[fileIndex] = file
    }

  })
}

/**
 * 文件移除
 * @param file
 * @param fileList
 */
function handleRemove (file, fileList) {
  console.log(file, fileList)
}

/**
 * 文件上传失败
 * @param err
 * @param file
 * @param fileList
 */
const handleError = (err:any, file:any, fileList:Array<any>) => {
  emit('errorMsg', '文件上传失败')
  clearInterval(fileProgress.percentageTime)
  fileProgress.percentageState = 'exception'
  setTimeout(() => {
    fileProgress.showPercentage = false
    fileProgress.percentageNumber = 0
  }, 3000)
}
/**
 * 文件超出个数限制时的钩子
 */
const handleExceed = files => {
  emit('errorMsg', `文件上传${props.limit}个数超出限制`)
  // ElMessage.info(`文件上传${props.limit}个数超出限制`)
}

/**
 * watch
 * 修复自动上传模式下,双向绑定limit、limitSize 变化,组件内还缓存着上一个选中的文件,需要将其清空
 */
watch(()=>props.limit,()=>{
  uploadRef.value.clearFiles()
})
watch(()=>props.limitSize,()=>{
  uploadRef.value.clearFiles()
})

/**
 * 手动上传
 */
function handleUpload (){
  uploadRef.value.submit()
}


function deepCopy (obj):any {
  var result = Array.isArray(obj) ? [] : {}
  for (var key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = deepCopy(obj[key]) // 递归复制
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}
defineExpose({
  handleUpload
})
</script>

<style scoped lang="scss">
.upload-file-view {
  ::v-deep(.el-upload){

  }
  .upload-cell{
    display: flex;
    align-items: center;
    .upload-server-button{
      margin-left: 10px;
    }
  }
  .upload-tip{
    margin: 10px;
    font-size: 14px;
     color: rgb(248, 113, 113);
  }
  .upload-cross-furrow{
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #cdd0d6;
    border-radius: 6px;
    background: #fafafa;
    &:hover{
      border: 1px dashed #409eff;
    }
    &::after{
      width: 20px;
      height: 2px;
      content: '';
      background: rgb(210, 197, 197);
    }
    &::before{
      width: 2px;
      height: 20px;
      content: '';
      background: rgb(210, 197, 197);
      position: absolute;
    }
  }
}
</style>
