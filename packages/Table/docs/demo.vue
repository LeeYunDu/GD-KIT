<template>
  <div>
    <gd-table
      ref="gdTable"
      :default-data="tableData"
      :tabel-column="tabelColumn"
      table-type="listTable"
      :pagination="false"
      style="margin-bottom: 10px;"
    >
      <template #slotColumn="{data}">
        <span style="color: red;">  {{ data.row.slotColumn }}</span>
      </template>
    </gd-table>
  </div>
</template>
<script setup lang="ts">
import { ref ,withDirectives } from 'vue'
import { ElButton,ElMessage } from 'element-plus'
const tableData = ref([
  { name:'张三',age:'18',address:'',slotColumn:'slotColumn' },
  { name:'李四',age:'18',address:'',slotColumn:'slotColumn' },
  { name:'王五',age:'18',address:'',slotColumn:'slotColumn' },
])

const tabelColumn = ref([
  { label: '序号',type:'index', width: '80px', prop: 'name' },
  { label: '姓名', width: 'auto', prop: 'name' },
  { label: '插槽列', width: 'auto', prop: 'slotColumn',slot:true },
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
    }, () => '详情'))
    return h('div', temp)
  } }
])
</script>
<style lang="scss">
</style>
