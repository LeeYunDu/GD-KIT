<template>
  <!-- 表格显示序号 -->
  <el-table-column
    v-if="column.type==='index'"
    label="序号"
    type="index"
    width="80"
    align="center"
  />
  <!-- 表格显示多选 -->
  <el-table-column
    v-else-if="column.type==='selection'"
    type="selection"
    width="55"
  />
  <el-table-column
    v-else-if="column.render"
    :label="column.label"
    :width="column.width"
    :min-width="column.minWidth"
    :prop="column.prop"
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
  <el-table-column
    v-else
    :prop="column.prop"
    :label="column.label"
    :width="column.width"
    :min-width="column.minWidth"
  />
</template>
<script>
import { defineComponent } from 'vue'
import cell from './cell.vue'

export default defineComponent({
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
  }
})
</script>
<style lang="">

</style>
