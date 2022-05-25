<template>
  <div class="upload-file-view">
    <el-upload
      v-if="!isView"
      class="upload-file-tool"
      :drag="drag"
      :action="action"
      :multiple="multiple"
      :limit="limit"
      :headers="headers"
      :with-credentials="true"
      :accept="accept"
      :name="name"
      :show-file-list="false"
      :before-upload="handleBeforeUpload"
      :on-progress="handleProgress"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-exceed="handleExceed"
      v-bind="$attrs"
    >
      <!-- 上传交互模式：拖拽文件形式 或  按钮点击模式 -->
      <template v-if="drag">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处或 <em>点击此处上传</em>
        </div>
      </template>
      <template v-else>
        <el-button type="primary" size="small ">{{ uploadText }}</el-button>
      </template>

      <template #tip>
        <div class="el-upload__tip"></div>
      </template>
    </el-upload>
    <!-- 上传进度条动画 -->
    <div v-if="fileProgress.showPercentage" class="progress-box">
      <el-progress
        :percentage="fileProgress.percentageNumber"
        :status="fileProgress.percentageState"
      />
    </div>

    <FileList
      v-bind="$attrs"
      :file-list="that.fileList"
      @handleEntityFileDelete="handleEntityFileDelete"
    />
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, watch } from 'vue'
import FileList from './components/fileList.vue'

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  isView:{
    type:Boolean,
    default:false
  },
  drag:{
    type:Boolean,
    default:false
  },
  action:{
    type:String,
    default:`/sos-files/files/manager/allow/upload`
  },
  // 是否上传多个文件
  multiple: {
    type: Boolean,
    default: false
  },
  // 文件上传个数限制
  limit: {
    type: Number,
    default: null
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
    default: '.doc,.docx,.pdf,.xls,.xlsx,.jpg,.jpeg,.png,.ceb,.tiff,.txt'
  },
  name: {
    type: String,
    default: 'file'
  },
  uploadText:{
    type:String,
    default:'上传文件'
  },
  // 最终输出的文件对象所需要的字段
  needField: {
    type: Array,
    default: () => ['url','fileName']
  }

})
const that = reactive({
  fileList: []
} as any)

const emit = defineEmits(['error','update:value'])


function init (){
  try {
    if (props.value.length > 0) {
      // const fileList = JSON.parse(props.value)
      const fileList = props.value
      that.fileList = fileList
    }
  } catch (error) {
    that.fileList = []
  }
}
init()

// 监听文件列表变化,抛出结果
watch(that.fileList, (file:any) => {
  const result:Array<any> = []
  file.forEach((element:any) => {
    const resuleFile:any = {}
    props.needField.forEach((key:any) => {
      resuleFile[key] = element[key] || undefined
    })
    result.push(resuleFile)
  })

  // emit('update:value', result.length > 0 ? JSON.stringify(result) : '')
  emit('update:value', result.length > 0 ? result :[])

})
/**
 * 文件上传前拦截
 * @param file
 */
const handleBeforeUpload = async  (file:any) => {
  return new Promise((resolve, reject) => {
    const filePath = file.name
    const index = filePath.lastIndexOf('.')
    const fileType = filePath.slice(index, filePath.length).toLowerCase()
    let FILE_SIZE_COUNT = 10
    const isLimit = file.size / 1024 / 1024 < FILE_SIZE_COUNT // 限制文件大小
    // 文件类型上传判断处理
    if (props.accept.includes(fileType)) {
      resolve(true)
    } else if (!isLimit) {
      ElMessage.info(`不支持文件大小超过${FILE_SIZE_COUNT}M`)
      reject(false)
    } else {
      ElMessage.info('不支持该类型文件上传')
      reject(false)
    }
  })
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
  let domain = response.data.domain
  response.data.resultList.forEach((file:any)=>{
    let fileObj = {
      fileName:file.originalFilename,
      url:domain + file.fileUrl
    }
    that.fileList.push(fileObj)
  })
}


/**
 * 文件上传失败
 * @param err
 * @param file
 * @param fileList
 */
const handleError = (err:any, file:any, fileList:Array<any>) => {
  emit('error', { err, file, fileList })
  clearInterval(fileProgress.percentageTime)
  fileProgress.percentageState = 'exception'
  setTimeout(() => {
    fileProgress.showPercentage = false
    fileProgress.percentageNumber = 0
  }, 3000)
  ElMessage.error('文件上传失败！')
}




/**
 * 删除文件列表的文件
 * @param index
 */
const handleEntityFileDelete = (index:number) => {
  ElMessageBox.confirm(
    '是否删除该文件 ?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      that.fileList.splice(index, 1)

      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    })
    .catch(() => {

    })
}


/**
 * 文件超出个数限制时的钩子
 */
const handleExceed = () => {
  ElMessage.info(`文件上传${props.limit}个数超出限制`)
}
</script>

<style scoped lang="scss">
.upload-file-view {

  ::v-deep(.el-upload){

  }
}
</style>
