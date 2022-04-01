<template>
  <div class="breadcrumb-view">
    <span>
      <!-- <img style="margin-right: 10px" src="/static/images/icon-position.png"> -->
    </span>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="(name, index) in data"
        :key="index"
        style="cursor: pointer"
        @click="onClick({name,index})"
      >
        <span class="area-name">{{ name }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts">
export default { name: 'Breadcrumb' }
</script>
<script lang='ts' setup>
import { ArrowRight } from '@element-plus/icons-vue'
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  onClick:{
    type:Function,
    default:null
  }
})

const emit = defineEmits(['handleJump'])
const handleClick = (name: string, index: number) => {
  props.onClick({ name, index })
}
</script>

<style lang='scss' scoped>
.breadcrumb-view {
  display: flex;
  align-items: center;
  .area-name {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #b3f8ff;
  }
}
</style>
