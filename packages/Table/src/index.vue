<template>
  <section class="table-view">
    <el-table
      v-bind="$attrs"
      ref="tableRef"
    >
      <TableColumn
        v-for="column in columns"
        :key="column.prop"
        :column="column"
      >
        <template v-if="column.type=='slot'" #[column.prop]="{row}">
          <slot
            :name="column.prop"
            :column="column"
            :row="row"
          ></slot>
        </template>
      </TableColumn>
    </el-table>
    <!-- 分页按钮 -->
    <template v-if="'total' in $attrs">
      <Pagination v-bind="$attrs" />
    </template>
  </section>
</template>

<script setup lang="ts">
import { shallowRef ,PropType ,defineProps } from 'vue'
import TableColumn from './components/tableColumn.vue'
import Pagination from './components/pagination.vue'
const props = defineProps({
  columns:{
    type:Array as PropType<Array<any>>,
    default:()=>[],
    required: true
  },
})

const tableRef = shallowRef<HTMLTableElement>()

</script>

<style lang="scss">
.table-view{
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>

