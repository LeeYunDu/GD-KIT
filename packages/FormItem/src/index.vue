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
      <!-- 下拉选择器、多选框、单选框 -->
      <template v-else-if="['select','checkbox','radio'].includes(inputType)">
        <component
          :is="`${itemPrefix}${itemTypeMap[inputType]}`"
          v-bind="{...$attrs,...inputProps}"
          :placeholder="placeholder"
        >
          <!-- 三者之间绑定值的方式不同需要判断下 -->
          <component
            :is="`${itemPrefix}${itemTypeOptionMap[inputType]}`"
            v-for="(item,index) in inputProps.options"
            :key="index"
            v-bind="item"
            :label="['checkbox','radio'].includes(inputType)?item.value:item.label"
          >
            <template v-if="['checkbox','radio'].includes(inputType)">
              {{ item.label }}
            </template>
          </component>
        </component>
      </template>
      <template v-else-if="['upload'].includes(inputType)">
        upload
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
import { computed,ref,Ref,PropType, useAttrs } from 'vue'

const props = defineProps({
  inputType:{  type:String,  default:'input' },
  label:{ type:String,  default:'' },
  prop:{ type:String, default:'' },
  labelWidth: { type: [Number, String], default: '' },
  inputUnit:{ type:String,default:'' },
  require:{ type:Boolean,default:false },
  rules:{ type:Array,default:[] },

  span:{ type:[Number,String],default:6 },
  colOffset: { type: Number, default: 0 },

  slotName:{ type:String },

  formItemProps:{  type:Object,  default:()=>({}) },
  inputProps:{ type:Object, default:()=>({}) }
})

const itemPrefix = ref('el-')

const itemTypeMap:Ref<any> = ref({
  'select':'select',
  'radio':'radio-group',
  'checkbox':'checkbox-group',
})

const itemTypeOptionMap:Ref<any> = ref({
  'select':'option',
  'radio':'radio',
  'checkbox':'checkbox',
})





const attrs = useAttrs()

const placeholder = computed(() => {
  if (props.label && !('placeholder' in attrs))
    return ['select', 'date'].includes(props.inputType)
      ? `请选择${props.label.replace('：', '')}`
      : `请输入${props.label.replace('：', '')}`
  return attrs.placeholder || ''
})

const rule = computed(()=>{
  if(props.require){
    return [{ required: true, message: '该项为必填项', trigger: 'blur' },...props.rules]
  }else{
    return props.rules
  }

})

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
