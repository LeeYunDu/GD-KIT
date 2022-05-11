<template>
  <section class="page-view">
    <el-pagination
      v-model:current-page="cPage"
      :page-size="params.pageSize"
      layout="total, prev, pager, next,jumper"
      :total="total"
      v-bind="$attrs"
      @current-change="onPageCurrentChange"
    />
  </section>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  params: { type: Object,default: () => ({}) },
  total: { type: Number,default: 0 },
})

const emit = defineEmits(['pageChange','update:pageNun'])


const cPage = computed({
  get: () => props.params.pageNum,
  set: page => emit('update:pageNun', page)
})

const onPageCurrentChange = page =>  emit('pageChange')

</script>

<style lang="scss" scoped>
.page-view {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 8px 0;
  box-sizing: border-box;
  ::v-deep(.el-pagination) {
    display: flex;
    align-items: center;
    > button {
      border: 1px solid rgba(0, 0, 0, 0.15);
      background-color: #fff;
    }
    // .el-pager {
    //   > li {
    //     border: 1px solid #D9D9D9;
    //     background-color: #fff;
    //     color:  #333333;
    //     font-weight: normal;
    //     font-size: 14px;
    //     &:not(.disabled).active {
    //       background-color: #fff;
    //       border: 1px solid #3DA0FD;
    //       color:  #3DA0FD;
    //     }
    //     &:not(.disabled):hover {
    //       color: #3DA0FD;
    //     }
    //   }
    // }
  }
}
</style>
