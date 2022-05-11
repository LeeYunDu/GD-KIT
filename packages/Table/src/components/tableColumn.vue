<template>
  <!-- 多级表头递归 -->
  <el-table-column
    v-if="column.columns&&column.columns.length>0"
    v-bind="column"
  >
    <tableColumn v-for="(item,index) in column.columns" :key="setKey(item.prop,index)" :column="item" />
  </el-table-column>
  <!-- render单元格 -->
  <el-table-column
    v-else-if="column.type==='slot'"
    v-bind="column"
  >
    <template #default="{row}">
      <slot
        :name="column.prop"
        :column="column"
        :row="row"
      ></slot>
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="column.render"
    v-bind="column"
  >
    <template #default="scope">
      <cell
        :render="column.render"
        :row="scope.row"
        :column="column"
        :scope="scope"
      />
    </template>
  </el-table-column>
  <!-- 正常表格列显示 -->
  <el-table-column
    v-else
    v-bind="column"
  />
</template>
<script lang="ts" setup>
import { PropType } from 'vue'
import cell from './cell.vue'

const props = defineProps({
  column:{
    type:Object as  PropType<any>,
    required: true
  },
  index:{
    type:Number
  }
})
const setKey = (porp:any, index:number) => {
  return `${porp}_${index}`
}
</script>

