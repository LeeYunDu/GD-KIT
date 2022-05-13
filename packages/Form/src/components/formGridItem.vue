<template>
  <el-col
    class="form-grid-item"
    :span="span"
    v-bind="$attrs"
  >
    <slot></slot>
  </el-col>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  span:{
    type:Number,
    default:24
  }
})

</script>
<style lang="scss" scoped>
.form-grid-item{

}
</style>
