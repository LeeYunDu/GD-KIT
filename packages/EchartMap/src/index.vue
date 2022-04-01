<template>
  <div class="echart-map-container">
    <div class="echart-map-header-box">
      <Breadcrumb
        v-if="breadcrumb"
        v-model:data="that.breadcrumb"
        :on-click="handleBreadcrumbClick"
      />
      <slot name="prefix"></slot>
    </div>
    <div id="map-container"></div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import Breadcrumb from './components/breadcrumb.vue'
import { useCMap } from './CMap'
import { onMounted, reactive,watchEffect, onUnmounted } from 'vue'
const props = defineProps({
  breadcrumb:{
    type:Boolean, //面包屑
    default:true
  },
  onMouseover:{ // 地图鼠标经过事件
    type:Function,
    default:null
  },
  onMouseClick:{ // 地图鼠标点击事件
    type:Function,
    default:null
  }
})
let that = reactive<any>({
  breadcrumb:[],
  currentArea:'',
  chart:null
})

const init = async ()=>{
  const cmap = await useCMap('map-container', {
    type: 'geo',
    area: '浙江省',
    areaZoom: 1,
    onMouseClick:props.onMouseClick
  })
  that = Object.assign(that,cmap)
  emit('load',that)
  registMapEvent()
}
onMounted(init)
// 地图事件注册
const registMapEvent = ()=>{
  // 鼠标悬浮
  props.onMouseover&&that.chart.on('mouseover',((target:any)=>debounce(props.onMouseover,1000,true)(target,that)))
}
// 组件销毁 - 注销地图事件注册
const unRegistMapEvent = ()=>{
  that.chart.off('mouseover')
  that.chart.off('click')
}
onUnmounted(unRegistMapEvent)

function debounce (fn:any, delay:number, immediate = false) {
  return function (arg1?,arg2?) {
    const time = delay
    const _arguments = arguments
    if (immediate && fn.id === undefined) {
      fn.apply(this, _arguments)
      fn.id = new Date().getTime()
    } else {
      if (fn.id) {
        clearTimeout(fn.id)
      }
      fn.id = setTimeout(function () {
        fn.apply(this, _arguments)
      }, time)
    }
  }
}

// 面包屑跳转
const handleBreadcrumbClick = (item: any) => {
  const { name, index } = item
  that.breadcrumb =that.breadcrumb.slice(
    0,
    index + 1
  )
  // 地区切换
  that.deepRouterMap(name)
  emit('breadcrumbClicked')
}
// 当前所在区域
watchEffect(() => {
  let area = that.breadcrumb[
    that.breadcrumb.length - 1
  ]
  that.currentArea = area
  emit('changeArea', area)
})
const emit = defineEmits(['changeArea','breadcrumbClicked','load'])
defineExpose({
  $CMAP:that
})
</script>
<style>

</style>
<style lang="scss" scoped>

.echart-map-container{
  height: 500px;
  width: 100%;
  position: relative;
  background: #010d38;
  #map-container{
    height: 100%;
    width: 100%;
  }

  .echart-map-header-box{
    position: absolute;
    top: 15px;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
  }
}
</style>
