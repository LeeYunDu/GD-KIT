<template>
  <!-- 多级表头递归 -->
  <el-table-column
    v-if="column.columns"
    v-bind="column"
  >
    <tableColumn v-for="(item,index) in column.columns" :column='item' :key="setKey(item,index)"></tableColumn>
  </el-table-column>
  <!-- render单元格 -->
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
<script lang="ts">
import { defineComponent } from 'vue'
import cell from './cell.vue'

export default defineComponent({
  name:'tableColumn',
  components: {
    cell
  },
  props: {
    column: {
      type: Object,
      required: true,
      default: () => {}
    },
    index:{
      type:Number
    }
  },
  setup(props:any){
    const setKey = (item:any, index:number) => {
      if ((props).loopKey in item) {
        return item[(props).loopKey]
      } else {
        return index
      }
    }
    return{
      setKey
    }
  }
})
</script>

