<template>
  <div id="mapContainer"></div>
  <Tooltip :marker="state.tooltipInfo" />
</template>

<script lang="ts" setup>

import { onMounted, ref } from 'vue'
import useAmap from './hooks/use-amap'
import markerIcon from './static/images/marker.png'
import markerActive from './static/images/marker-active.png'
import Tooltip from './component/Tooltip.vue'

let state = ref({
  showInfoWindow:false,
  tooltipInfo:{},
})

let mapInstance:any  =  useAmap({
  container:'mapContainer',
  mapOptions:{
    center: [103.226155,25.562497362],
    zoom:8
  },
  // mapStyle: 'amap://styles/d0cd966c977f164959cdfe756c2d217a',
})



mapInstance.subMarkerClick((pick:any)=>{
  let { marker } = pick
  let { position } = marker.w
  mapInstance.map.value.panTo([position.lng, position.lat])
  state.value.tooltipInfo = marker.w.extData
  mapInstance.addInfoWindow(marker,{
    marker:marker,
    offset:  new AMap.Pixel(330,150),
    domId:'map-tooltip'
  })
})

let mockData = [
  { lon:'103.226155',lat:'25.562497362' }
]

async function addMarker (){


  let data = mockData
  let markers:any[] = []
  let PromiseArr:any[] = []
  data.forEach(async (marker:any)=>{
    PromiseArr.push(drawNormalMarker(marker))
  })

  let icons = await Promise.all(PromiseArr)

  icons.forEach((icon,index)=>{
    let { width,height,image } = icon
    let marker:any = mockData[index]
    let markerConfig = {
      icon: new AMap.Icon({
        size: new AMap.Size(width, height),
        offset: new AMap.Pixel(0, 0),
        image: image,
        imageSize: new AMap.Size(width, height)
      }),
      offset: new AMap.Pixel(0, 0),
      activeStyle:new AMap.Icon({
        size: new AMap.Size(74, 86),
        offset: new AMap.Pixel(0, 0),
        image: markerActive,
        imageSize: new AMap.Size(74,86)
      })
    }

    if(marker.lon&&marker.lat){
      markers.push({
        position: new AMap.LngLat(Number(marker.lon),Number(marker.lat)),
        title:marker.parkName,
        extData: marker,
        ...markerConfig
      })
    }
  })

  let markerOptions = {
    data:markers,
  }

  mapInstance.addMarker(markerOptions)

}


function drawNormalMarker (marker:any){
  return new Promise((resolve, reject) => {
    let name =  marker.parkName
    var canvas:any = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    var image = new Image()
    let iconWidth = 36
    let iconHeight = 48
    // image.src = loadImg('screen-xmtz-map/legend01.png')
    image.src = markerIcon
    let canvasWidth = iconWidth
    canvas.width = canvasWidth
    canvas.height = iconHeight
    // 绘制图片

    image.onload = function () {
      // 处理canvas宽度
      ctx.drawImage(image, 0, 0, image.width , image.height )
      // 抛出图片
      var tempSrc = canvas.toDataURL('image/png')
      resolve({
        image:tempSrc,
        width:canvas.width,
        height:canvas.height
      })
    }
  })
}

onMounted(addMarker)




</script>

<style scoped>
#mapContainer{
  width: 100%;
  height: 800px;
}
</style>
