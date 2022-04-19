



import { ref, Ref, computed  } from 'vue'
import * as echarts from 'echarts'
import { getGeoJSON } from './units/index'

const allMap: any = {

}

async function getArea (area: string) {
  // 地图注册
  if (!allMap[area]) {
    // const res: any = await getGeoJSON('浙江省')
    const res: any = await getGeoJSON(area)
    // 存储地区编码
    try {
      const { features } = res
      features.forEach((element: any) => {
        adcodeMap[element.properties.name] = element.properties.adcode
      })
    } catch (error) {
      console.error(error)
    }
    allMap[area] = res
    echarts.registerMap(area, res,)
  } else {
    console.log(`${area}注册过了`)
  }

}
export interface LngLat {
  0: number
  1: number
}
export interface CMapOption {
  type: string
  area: string
  zoom?: number
  areaZoom?: number
  pointsData?: any
  onMouseClick?:any
}
// 获取邮政编码映射
const adcodeMap: any = {}

export function useCMap (id: string, options: CMapOption) {
  const chart: Ref = ref(null)
  const bmap: Ref = ref(null)
  const properties = ref<any[]>([])
  const { zoom, areaZoom, pointsData,onMouseClick } = options

  const useType = ref(options.type)
  const area = options.area
  const geoZoom = computed(() => areaZoom)

  // 地图下钻面包屑
  const breadcrumb = ref<string[]>([])

  // 初始化浙江省版图
  async function init (area: string) {
    await getArea(area)
    if (!breadcrumb.value.includes(area)) { breadcrumb.value.push(area) }

  }
  async function initChart (id: string) {
    await init(area)

    // 内存溢出 需要清除事件绑定
    try {
      chart.value.off('click')
    } catch (error) {

    }
    if (!chart.value) chart.value = echarts.init(document.getElementById(id) as HTMLElement)
    addAreaChart(area)
  }

  // 热力图
  function addHeatChart (points: [number, number, number][]) {
    chart.value.setOption({
      visualMap: {
        show: false,
        top: 'top',
        min: 0,
        max: 5,
        seriesIndex: 0,
        calculable: true,
        inRange: {
          color: ['blue', 'blue', 'green', 'yellow', 'red']
        }
      },
      series: [
        {
          type: 'heatmap',
          coordinateSystem: 'geo',
          data: points,
          pointSize: 5,
          blurSize: 6
        }
      ]

    }, {
      replaceMerge: ['visualMap', 'series']
    })

  }

  function addMarker (points:[number,number][]){
    chart.value.setOption({
      series: [
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          data: points,
          pointSize: 5,
          blurSize: 6,
          symbol:'image://data:image/png;base64,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',
          symbolSize: [36,40], // 标记大小
        }
      ]
    }, {
      replaceMerge: ['series']
    })
  }


  async function addAreaChart (area: string) {
    // 地区来回切换内存溢出 需要清除事件绑定
    try {
      chart.value.off('click')
    } catch (error) {
    }
    const options = {

      tooltip: {
        show: false,
        formatter: (params: any) => {
          return `${params.data.fromName}->${params.data.toName}：${params.data.count}人`
        }
      },
      geo: {
        layoutCenter: ['50%', '60%'],
        layoutSize: 400,
        top: '10%',
        show: true,
        map: area,
        zoom: geoZoom.value || 2.2,
        label: {
          show: true,
          textStyle: {
            color: '#fff'
          },
          emphasis: {
            color: '#ff0' //悬浮背景
          }
        },
        roam: true, //是否允许缩放
        itemStyle: {
          normal: {
            color: 'rgba(51, 69, 89, .5)', //地图背景色
            borderColor: '#516a89', //省市边界线00fcff 516a89
            borderWidth: 1
          },
          emphasis: {
            color: 'rgba(37, 43, 61, .5)' //悬浮背景
          }
        }
      }

    }
    chart.value.setOption(options,true, {
      replaceMerge: ['visualMap', 'series']
    })


    // 点击事件
    chart.value.on('click', async (params: any) => {
      console.log(params,'params')

      if(params.componentType==='geo'){
        const { name } = params
        area = name
        deepRouterMap(name)

      }
      // 外部组件额外调用的click事件
      onMouseClick&&onMouseClick(params)
    })
    chart.value.resize()
    // 面包屑添加一级，无重复添加
    if (!breadcrumb.value.includes(area)) { breadcrumb.value.push(area) }

  }
  //地图下钻
  async function deepRouterMap (areaName: string) {
    // 点击的时候根据邮政编码去请求datav接口（因为跨域限制,需要后端处理,爬虫跑下数据也可以下载到本地）,返回geojson进行注册地区
    // const adcode = adcodeMap[areaName]
    await getArea(areaName)
    addAreaChart(areaName)
  }
  return new Promise(async resolve => {
    await initChart(id)
    resolve({
      useType,
      bmap,
      chart,
      properties,
      addHeatChart,
      breadcrumb,
      deepRouterMap,
      addMarker
    })
  })
}

