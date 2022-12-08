<template>
  <div class="offset-box">
    <div id="map-tooltip" class="tooltip">
      自定义弹窗内容
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  marker:{
    type:Object,
    default:()=>({})
  }
})


</script>

<style lang="scss" scoped>



.tooltip {
  position: relative;
  width: 500px;
  height: 500px;
  background: blue;
  color: white;
  font-size: 32px;
  // background-image: url(static/images/screen-area/tooltip-bg.png);
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
}

.offset-box{
  position: relative;
  top: -9999px;
}
</style>
