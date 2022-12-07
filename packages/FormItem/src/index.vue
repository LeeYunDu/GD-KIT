<template>
  <el-col
    :span="span"
    :xl="span"
    :lg="span"
    :md="span"
    :sm="span"
    :xs="span"
    :offset="colOffset"
    class="form-item-view"
  >
    <el-form-item
      :label="label"
      :prop="prop"
      v-bind="formItemProps"
      :rules="rule"
      :label-width="labelWidth ? `${Number(labelWidth) / 192}rem` : undefined"
    >
      <!-- 插槽 -->
      <template v-if="inputType==='slot'">
        <slot :name="slotName??prop"></slot>
      </template>
      <!-- 上传组件 -->
      <template v-else-if="['upload'].includes(inputType)">
        upload
      </template>
      <!-- 联级选择器 -->
      <template v-else-if="['cascader'].includes(inputType)">
      </template>
      <!-- 时间选择器 -->
      <template v-else-if="['date'].includes(inputType)">
        <component
          :is="`${itemPrefix}${itemTypeMap[inputType]}`"
          v-bind="{...$attrs,...inputProps}"
          :placeholder="placeholder"
          :value-format="valueFormat"
          @change="ondDateChange"
        />
      </template>
      <!-- 下拉框 -->
      <template v-else-if="['select'].includes(inputType)">
        <component
          :is="`${itemPrefix}${itemTypeMap[inputType]}`"
          v-bind="{...$attrs,...inputProps}"
          :placeholder="placeholder"
        >
          <component
            :is="`${itemPrefix}${itemTypeOptionMap[inputType]}`"
            v-for="(item,index) in selectOption"
            :key="index"
            :label="item.label"
            :value="'valueKey' in $attrs?item:item[selectValueKey]"
            :disabled="(item.disabled??false)"
          />
        </component>
      </template>
      <!-- 多选框、单选框 -->
      <template v-else-if="['checkbox','radio'].includes(inputType)">
        <component
          :is="`${itemPrefix}${itemTypeMap[inputType]}`"
          v-bind="{...$attrs,...inputProps}"
          :placeholder="placeholder"
        >
          <!-- checkbox 目前还没有很好的设计 label 绑定的字段，传了valueKey绑定item 不传默认选项value -->
          <component
            :is="`${itemPrefix}${itemTypeOptionMap[inputType]}`"
            v-for="(item,index) in selectOption"
            v-bind="item"
            :key="index"
            :label="'valueKey' in $attrs?item:item[selectValueKey]"
          >
            {{ item.label }}
          </component>
        </component>
      </template>

      <template v-else>
        <component
          :is="`${itemPrefix}${inputType}`"
          v-bind="{...$attrs,...inputProps}"
          :placeholder="placeholder"
        >
          <!-- 暴露出组件自带的slot -->
          <template v-for="(slot,slotKey) in $slots" #[slotKey]>
            <slot :name="slotKey"></slot>
          </template>
          <!-- 给 input输入框添加单位 -->
          <template v-if="inputUnit && !$slots.suffix" #suffix>
            <span>{{ inputUnit }}</span>
          </template>
        </component>
      </template>
    </el-form-item>
  </el-col>
</template>
<script lang="ts" setup>

import { useStore } from 'vuex'
import { computed,ref,Ref,PropType, useAttrs } from 'vue'

const props = defineProps({
  inputType:{  type:String,  default:'input' },
  label:{ type:String,  default:'' },
  prop:{ type:String, default:'' },
  labelWidth: { type: [Number, String], default: '' },
  inputUnit:{ type:String,default:'' },
  require:{ type:Boolean,default:false },
  rules:{ type:Array,default:()=>[] },
  selectValueKey:{ type:String,default:'value' },
  valueFormat:{ type:String,default:'x' },
  span:{ type:[Number,String],default:6 },
  colOffset: { type: Number, default: 0 },
  slotName:{ type:String },

  formData:{ type:Object,default:()=>({}) },
  formItemProps:{  type:Object,  default:()=>({}) },
  inputProps:{ type:Object, default:()=>({}) }
})

let store = useStore()
const attrs = useAttrs()
let emits = defineEmits(['change'])

const itemPrefix = ref('el-')
const itemTypeMap:Ref<any> = ref({
  'select':'select',
  'radio':'radio-group',
  'checkbox':'checkbox-group',
  'date':'date-picker'
})
const itemTypeOptionMap:Ref<any> = ref({
  'select':'option',
  'radio':'radio',
  'checkbox':'checkbox',
})

/**
 * 字段占位符内容显示
 */
const placeholder = computed(() => {
  if (props.label && !('placeholder' in attrs))
    return ['select', 'date'].includes(props.inputType)
      ? `请选择${props.label.replace('：', '')}`
      : `请输入${props.label.replace('：', '')}`
  return attrs.placeholder || ''
})

/**
 * 表单字段校验规则
 */
const rule = computed(()=>{
  if(props.require){
    return [{ required: true, message: '该项为必填项', trigger: 'blur' },...props.rules]
  }else{
    return props.rules
  }
})

/**
 * 选项配置
 */
const selectOption = computed(()=>{
  if(Array.isArray(props.inputProps.options)){
    return props.inputProps.options
  }else if(typeof props.inputProps.options ==='string'){
    // 从字典里取
    return []
  }else{
    // 其他获取options的方式
    return []
  }
})


/**
 * 时间范围选择器Change事件
 * @param value
 */
function ondDateChange (value:any){
  // 时间范围赋值2个字段
  if('timerangeFields' in attrs && attrs['type']==='datetimerange'){
    value.forEach((element:any,index:number) => {
      (props.formData as any)[(attrs['timerangeFields'] as any)[index]] = element
    })
  }
  emits('change',value)
}

</script>
<style lang="scss" scoped>
.form-item-view{
  ::v-deep(.el-form-item){
    .el-form-item__content{
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
          -webkit-appearance: none;
      }
    }
  }
}

</style>
