<template>
  <template v-if="runderProgressBar()">
    <cellTag
      :tag-type="statusType"
      :row="row"
      :status="status"
      :cell-style="cellStyle"
      v-bind="$attrs"
    />
  </template>
</template>
<script lang="ts" setup>
import cellTag from './cell.tag.vue'
import { ref } from 'vue'
let props = defineProps({
  ganttType:{
    type:String,
    default:'month'
  },
  column:{
    type:Object,
    default:()=>({})
  },
  row:{
    type:Object,
    default:()=>({})
  },
  formatting:{
    type:String,
    default:''
  }
})


/**
 * 生成进度条
 * 1、根据计划的开始时间,判断放在那一个单元格内
 * 2、判断进度条的状态（未计划、已制定计划、计划提前开始、计划已开始、计划如期完成、计划逾期）
 */



let status = ref('')
let statusType = ref('')

let timestampMap:any = {
  year:1000 * 60 * 60 * 24 * 365,
  month:1000 * 60 * 60 * 24 * 31 ,
  week:1000 * 60 * 60 * 24 * 7,
  day:1000 * 60 * 60 * 24,
}

let timestampDayMap:any = {
  month: 31,
  week:7,
  day:1,
  year:365
}

let timestampDay = 1000 * 60 * 60 * 24

let cellStyle = ref<any>({
  width:0,
  offset:0,
  cellContent:''
})

function runderProgressBar (){
  let localtion = getBegeinLocation()
  let day = 0
  if(localtion){
    let { projectPlanStartTime,projectPlanEndTime,projectActStartTime,projectActEndTime }  = props.row
    switch (true) {
      case projectPlanStartTime&&projectPlanEndTime&&(projectActStartTime==0&&projectActEndTime==0):
        day = Math.ceil((projectPlanEndTime - projectPlanStartTime) / timestampDay )
        cellStyle.value.width = Number(day / timestampDayMap[props.ganttType]).toFixed(2)
        cellStyle.value.content ='计划工期   ' + day + '天'
        statusType.value = '0'
        break
      case projectPlanStartTime&&projectPlanEndTime&&projectActStartTime&&(projectActEndTime===0):
        day = Math.ceil((projectPlanEndTime - projectPlanStartTime) / timestampDay )
        cellStyle.value.width = Number(day / timestampDayMap[props.ganttType]).toFixed(2)
        cellStyle.value.content ='未提交完成时间'
        statusType.value = '4'
        break
        // 4个时间点都填了，来判断任务完成状态  提前；如期完成（时间戳差距在1天之内）；延期
      case projectPlanStartTime>0&&projectPlanEndTime>0&&projectActStartTime>0&&projectActEndTime>0:
        // 如期完成
        let isNomal =  ((projectPlanEndTime - projectActEndTime) / timestampDay) <= 1 && ((projectPlanEndTime - projectActEndTime) / timestampDay) >= 0
        if(isNomal){
          day = Math.ceil((projectPlanEndTime - projectPlanStartTime) / timestampDay )
          cellStyle.value.width = Number(day / timestampDayMap[props.ganttType]).toFixed(2)
          cellStyle.value.content ='如期完成'
          statusType.value = '2'
          break
        }
        // 延期
        let ipPstpones = ((projectActEndTime - projectPlanEndTime) / timestampDay) > 1
        if(ipPstpones){
          day = Math.ceil((projectActEndTime - projectPlanEndTime) / timestampDay )
          let cellWidthDay =  Math.ceil((projectActEndTime - projectPlanStartTime) / timestampDay )
          cellStyle.value.width = Number(cellWidthDay / timestampDayMap[props.ganttType]).toFixed(2)
          cellStyle.value.content ='逾期' + day + '天'
          statusType.value = '3'
          break
        }

        // 判断是否提前完成任务
        let isBefor =  ((projectActEndTime - projectPlanEndTime) / timestampDay) < 1
        if(isBefor){
          day = Math.ceil((projectActEndTime - projectPlanEndTime) / timestampDay )
          let cellWidthDay =  Math.ceil((projectActEndTime - projectPlanStartTime) / timestampDay )
          cellStyle.value.width = Number(cellWidthDay / timestampDayMap[props.ganttType]).toFixed(2)
          cellStyle.value.content ='提前' + Math.abs(day) + '天'
          statusType.value = '1'
          break
        }
        break
      default:
        break
    }
    return true
  }else{
    return ''
  }
}

function getBegeinLocation (){
  let  { projectPlanStartTime } = props.row

  if(projectPlanStartTime){
    let name = parseTime(new Date(Number(projectPlanStartTime)),props.formatting)
    return name==props.column.label
  }else{
    return false
  }
}


/**
 * 时间转换
 */
function parseTime (time: string | number, cFormat?: string) {
  if (!time) {
    return ''
  }
  if (arguments.length === 0) {
    return null
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(String(time)))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  } as any
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result: any, key: string | number) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}


</script>
