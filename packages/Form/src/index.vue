<template>
  <div class="form-view">
    <el-form
      ref="FormRef"
      :model="params"
      v-bind="formProps"
    >
      <FormGridRow v-bind="gridProps">
        <template
          v-for="item in labels"
          :key="item.prop"
        >
          <FormGridItem
            v-bind="item.gridProps"
          >
            <FormItem
              v-model="params[item.prop]"
              v-bind="item"
            >
              <template v-if="item.type=='slot'" #[item.prop]>
                <slot :name="item.prop"></slot>
              </template>
            </FormItem>
          </FormGridItem>
        </template>
      </FormGridRow>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { PropType,ref, watchEffect,Ref, shallowRef } from 'vue'
import FormGridRow from './components/formGridRow.vue'
import FormGridItem from './components/formGridItem.vue'
import FormItem from './components/formItem.vue'

const props = defineProps({
  model:{
    type:Object,
    require:true,
  },
  labels:{
    type:Array as PropType<Array<any>>,
    require:true
  },
  gridProps:{
    type:Object
  },
  formProps:{
    type:Object
  }
})

const FormRef = shallowRef<HTMLDivElement>()
const params: Ref<any> = ref(props.model)

function validate (){
  return new Promise(resovle=>{
    (FormRef.value as any).validate((result:boolean)=>{
      resovle(result)
    })
  })
}
function resetFields (){
  (FormRef.value as any).resetFields()
}
defineExpose({
  validate,resetFields
})
watchEffect(() => {
  params.value = props.model
})
</script>

<style scoped>
.gd-form {

}
</style>
