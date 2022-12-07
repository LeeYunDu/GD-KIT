<template>
  <div>
    <gd-form
      v-bind="formViewProps"
      ref="formRef"
      :model="params"
      @change-bus="handleChange"
    >
      <template #slot>
        这是表单插槽
      </template>
    </gd-form>
    <el-button type="text" @click="handleSubmit">提交</el-button>
    <el-button type="text" @click="handleReset">重置</el-button>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { ref, shallowRef } from 'vue'

function handleSubmit (){
  formRef.value.validate().then((valid:boolean)=>{
    ElMessage.success(`校验结果:${valid}`)
  })
}
function handleReset (){
  formRef.value.resetFields()
}
const formRef = shallowRef()
let params = ref({
  input:'',
  radio:'',
  datePicker:'',
  timePicker:'',
  select:'',
  slot:'',
  checkbox:[]
})

let formViewProps = ref({
  // 表单字段
  labels:[
    { label:'输入框',prop:'input',type:'input',gridProps:{ span:12 } },
    { label:'输入框必填',prop:'input2',type:'input',formItemProps:{ required:true } },
    { label:'输入框数字类型',prop:'inputNumber',type:'input',formItemProps:{ required:true },inputProps:{ type:'number' } },
    { label:'表单插槽',prop:'slot',type:'slot',gridProps:{ span:12 } },
    { label:'滑块',prop:'switch',type:'switch',gridProps:{ span:24 } },
    { label:'下拉框',prop:'select',type:'select',
      inputProps:{
        clearable:true,
        multiple:true,
        options:[
          { label:'选项1',value:'option1',disabled:true },
          { label:'选项2',value:'option2' }
        ]
      }
    },
    { label:'复选框',prop:'checkbox',type:'checkbox',
      inputProps:{
        options:[
          { label:'复选框1',value:'fuxuankuang1' },
          { label:'复选框2',value:'fuxuankuang2' },
        ]
      }
    },
    { label:'单选框',prop:'radio',type:'radio',
      inputProps:{
        options:[
          { label:'单选框',value:'danxuan1' },
          { label:'单选框',value:'danxuan2' },
        ]
      }
    },
    { label:'日期选择器',prop:'datePicker',type:'date-picker',inputProps:{ 'value-format':'x' },gridProps:{ span:24 } },
    { label:'时间选择器',prop:'timePicker',type:'time-picker',inputProps:{ 'value-format':'x' },gridProps:{ span:24 } }
  ],
  // 表单组件配置参数
  formProps:{
    rules:{
      input: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
      ]
    }
  },
  gridProps:{
    gutter:'20',
    justify:'start'
  }
})
function handleChange (item:any){
  console.log('change事件:',item.type,item.value)
}
</script>
