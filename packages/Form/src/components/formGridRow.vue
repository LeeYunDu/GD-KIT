<template>
  <div class="form-grid-row">
    <el-row v-bind="$attrs">
      <slot></slot>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue'
</script>
<style lang="scss" scoped>
.form-grid-row{
  width: 100%;
  box-sizing: border-box;
  position: relative;
  ::v-deep(.el-row){
    margin-bottom:0;
  }
}
</style>
