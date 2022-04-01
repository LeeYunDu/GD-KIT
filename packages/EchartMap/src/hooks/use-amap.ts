import { ref, onMounted, reactive, toRefs } from 'vue'
import { calculateCenter, isArray, isString } from '../units/is'

export interface AMapOptionsMode {
  container: string | Element
  mapOptions: any
  mapStyle?: string
  loop: any
}

export interface MarkerMode {
  picture: string
  content: string
}

export interface AMapStateMode {
  map: any
  [key: string]: any
}

export interface PolygonStyleMode {
  strokeColor?: string
  strokeWidth?: number
  fillColor?: string
}

export interface PolylineStyleMode {
  strokeColor?: string
  borderWeight?: number
  lineJoin?: string
}

export interface AddPolygonMode {
  geoJSON: any
  style?: PolygonStyleMode
  activeStyle?: PolygonStyleMode
  type: string
}

export interface AddPolylineMode {
  data: any
  style?: PolylineStyleMode
}

export type MarkerOptionsMode = {
  position: any
  icon?: any
  zIndex?: number
  content?: string
  [key: string]: any
}

export interface AddMarkerMode {
  data: MarkerOptionsMode | MarkerOptionsMode[]
}

export default function useBMap (options: AMapOptionsMode): AMapStateMode {
  let polygonResolve: any
  let markerResolve: any

  const { container, mapOptions, mapStyle, loop }: AMapOptionsMode = options || {}
  const state = reactive<any>({
    markers: [] as any[],
    polygons: [] as any[],
    style: null,
    activeStyle: null,

    timer: null,
    num: 0,
    // timer1: null,
    // num1: 0
  })

  const map = ref<any>({})
  onMounted(() => {
    clearInterval(state.timer)
    // clearInterval(state.timer1)
    init()
  })
  function init () {
    initMap()
  }

  function initMap () {
    const useContainer = isString(container) ? document.getElementById(container) : container
    if (!useContainer) throw Error('map widthout container to mounted!')

    map.value = new AMap.Map(container, mapOptions)
    mapStyle && map.value.setMapStyle(mapStyle)
  }

  function addPolygon (opts: AddPolygonMode) {
    const { geoJSON, style, activeStyle, type }: AddPolygonMode = opts || {}
    state.style = style
    state.activeStyle = activeStyle
    const polygons = [] as any

    new AMap.GeoJSON({
      geoJSON: geoJSON,
      getPolygon: (geojson: any, lnglats: any[]) => {
        const center = calculateCenter(lnglats[0])
        const polygon = new AMap.Polygon({
          path: lnglats,
          ...(style || {}),
          extData: {
            center,
            name: geojson.properties.Name,
            ...geojson.properties
          }
        })
        polygon.on('click', () => {
          polygonResolve && polygonResolve({ polygon })
          polygons.map((polygon: any) => {
            polygon.setOptions(style)
          })
          polygon.setOptions(activeStyle)
        })
        // if (type) {
        polygons.push(polygon)
        // }
      }
    })
    state.polygons = state.polygons.concat(polygons)
    map.value.add(polygons)

    if (loop && !state.timer && type) {
      changeloop(type)
    }

    return {
      polygons
    }
  }

  function addPolylinelp (opt: AddPolylineMode) {
    const path = [] as any
    opt.data.map((i: any) => {
      if (i && i.split(',').length > 1) {
        path.push(new AMap.LngLat(i.split(',')[0], i.split(',')[1]))
      }
    })
    // 创建折线实例
    state.polyline = new AMap.Polyline({
      path: path,
      ...opt.style
    })
    // 将折线添加至地图实例
    map.value.add(state.polyline)
    return state.polyline
  }



  function changeloop (type: string) {
    clearInterval(state.timer)
    if (type === 'street') {
      state.num = 0
    } else {
      state.num = 8
    }

    state.timer = setInterval(() => {
      if (type === 'street') {
        if (state.num >= state.polygons.length - 3) state.num = 0
      } else {
        if (state.num >= state.polygons.length) state.num = 8
      }

      polygonResolve && polygonResolve({ polygon: state.polygons[state.num] })
      state.polygons.map((polygon: any) => {
        polygon.setOptions(state.style)
      })
      state.polygons[state.num].setOptions(state.activeStyle)
      state.num++
    }, 5000)
  }

  function addMarker (opts: AddMarkerMode) {
    const { data }: AddMarkerMode = opts || {}
    const umd: any = isArray(data) ? data : [data]
    if (!umd.length) return
    const markers = [] as any
    umd.map((item: MarkerOptionsMode) => {
      const marker = new AMap.Marker({
        ...item
      })
      marker.on('click', () => {
        markerResolve && markerResolve({ marker })
      })
      markers.push(marker)
    })
    state.markers = state.markers.concat(markers)
    map.value.add(markers)
    return {
      markers
    }
  }

  function removePolygon () {
    map.value.remove(state.polygons)
    state.polygons = []
  }

  function removeMarkers () {
    map.value.remove(state.markers)
    state.markers = []
  }

  function setPolygonsOptions (polygons: any[], opts: any = {}) {
    if (!polygons.length) return
    polygons.map((polygon: any) => {
      polygon.setOptions({
        ...opts
      })
    })
  }

  return {
    // output ref
    map,
    ...toRefs(state),

    // output fn
    addPolygon,
    addPolylinelp,
    addMarker,
    changeloop,
    removePolygon,
    removeMarkers,
    setPolygonsOptions,
    subPolygonClick: (fn: any) => (polygonResolve = fn),
    subMarkerClick: (fn: any) => (markerResolve = fn)
  }
}
