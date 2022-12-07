<template>
  <el-col>
    <el-form-item
      :label="label"
      :prop="prop"
      v-bind="formItemProps"
      class="form-item-view"
      :rules="rules()"
    >
      <template v-if="type==='slot'">
        <slot :name="prop"></slot>
      </template>
      <template v-else-if="['select','checkbox','radio'].includes(type)">
        <component
          :is="`${itemPrefix}${itemTypeMap[type]}`"
          v-bind="{...$attrs,...inputProps}"
        >
          <component
            :is="`${itemPrefix}${itemTypeOptionMap[type]}`"
            v-for="(item,index) in inputProps.options"
            :key="index"
            v-bind="item"
            :label="['checkbox','radio'].includes(type)?item.value:item.label"
          >
            <template v-if="['checkbox','radio'].includes(type)">
              {{ item.label }}
            </template>
          </component>
        </component>
      </template>
      <template v-else>
        <component
          :is="`${itemPrefix}${type}`"
          v-bind="{...$attrs,...inputProps}"
        />
      </template>
    </el-form-item>
  </el-col>
</template>
<script lang="ts" setup>
import { computed,ref,Ref,PropType } from 'vue'

const props = defineProps({

  label:{
    type:String,
    default:''
  },
  prop:{
    type:String,
    default:''
  },
  type:{
    type:String,
    default:'input'
  },
  formItemProps:{
    type:Object,
    default:()=>({})
  },
  inputProps:{
    type:Object,
    default:()=>({})
  }
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

const rules = ()=>{
  if(props.formItemProps.rules){
    return props.formItemProps.rules
  }else if (props.formItemProps.required) {
    return [{ required: true, message: '该项为必填项' }]
  }else{
    return []
  }
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
