<template>
  <div>
    <gd-table
      ref="gdTable"
      v-model:pageNun="tableViewProps.params.pageNum"
      v-bind="tableViewProps"
    >
      <template #slotColumn="{row}">
        {{ row }}
      </template>
    </gd-table>
  </div>
</template>
<script setup lang="ts">
import { ref ,withDirectives } from 'vue'
import { ElButton,ElMessage } from 'element-plus'
let tableViewProps = ref({
  height:'300px',
  columns:[
    { label: '插槽列', width: 'auto', prop: 'slotColumn',type:'slot',slot:true },
    { label: '多级表头', width: 'auto', columns:[
      { label: '数据项1', width: 'auto', prop: 'name' },
      { label: '数据项2', width: 'auto', prop: 'name',columns:[
        { label: '数据项3', width: 'auto', prop: 'name' },
        { label: '数据项4', width: 'auto', prop: 'name' }
      ] },
    ] },
    { label: 'render列', width: '100px', prop: 'date', render: (h, params) => {
      const value = params.row
      const temp:Array<any> = []
      // temp.push(withDirectives(h(ElButton, {
      //   type: 'primary',
      //   size: 'small',
      //   onClick: () => {
      //     ElMessage.info('render形式绑定指令写法')
      //   }
      // verifyRole 指令类 具体实现方法
      // }, () => 'render指令绑定'), [
      //   [verifyRole, 'sys_dict_add']
      // ]))
      temp.push(h(ElButton, {
        type: 'primary',
        size: 'small',
        onClick: () => {
          console.log('详情')
        }
      }, '详情'))
      return h('div', temp)
    } }
  ],
  data:[
    { name:1 ,slotColumn:'2' }
  ],
  total:100,
  params:{
    pageNum:1,
    pageSize:10
  }
})
</script>
<style lang="scss">
</style>
