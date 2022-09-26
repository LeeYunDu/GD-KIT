<template>
  <el-image
    class="file-img-zoom"
    v-bind="$attrs"
    style="width: 100px; height: 100px"
    fit="fill"
    :src="url"
    @click="handleOpenFile"
  >
    <template #error>
      <div class="failed-img">
        <!-- <img src="./static/images/icon-failed.png" alt=""> -->
      </div>
    </template>
  </el-image>
</template>
<script lang="ts" setup>
const emit = defineEmits(['openFile'])
defineProps({
  url:{
    type:String,
    url:''
  },
})
function handleOpenFile (){
  emit('openFile')
}
</script>

<style lang="scss" scoped>
.file-img-zoom{
  width: 100px;
  height: 100px;
  cursor: pointer;
  margin-right: 20px;
  .failed-img{
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: auto;
  }
}
</style>
