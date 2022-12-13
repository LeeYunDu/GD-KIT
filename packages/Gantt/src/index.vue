<template>
  <div class="gantt-view">
    <el-table
      :data="data"
      style="width: 100%"
      :cell-class-name="cellClassName"
      v-bind="$attrs"
      class="dark"
      border
    >
      <template v-for="(column,cI) in ganttColumn" :key="cI">
        <template v-if="column.type==='planTitle'">
          <el-table-column
            :label="column.label"
            width="120"
            fixed="left"
          >
            <template #default="{row,$index}">
              {{ row.nodeName }}
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column
            :prop="column.key"
            :label="column.label"
            width="110"
            header-align="center"
          >
            <template #default="{row,$index}">
              <Cell
                :gantt-type="ganttType"
                :column="column"
                :row="row"
                :formatting="formatting"
                v-bind="$attrs"
              />
            </template>
          </el-table-column>
        </template>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { parseTime } from '@/utils'
import Cell from './components/cell.vue'

let props = defineProps({
  data:{
    type:Array,
    default:()=>([])
  },
  column:{
    type:Array,
    default:()=>([])
  },
  ganttType:{
    type:String,
    default:'month'
  }
})

// 进度条区间 可能为 年/月/周/日

provide('ganttType',props.ganttType)


/**
 * 时间周期可通过计算返回任务的最小开始时间戳和最大（开始/结束）时间戳计算出来
 * 计算方式则按甘特图显示的进度区间类型来判断（年/月/周/日）
 */
let timestampMap:any = {
  year:1000 * 60 * 60 * 24 * 365,
  month:1000 * 60 * 60 * 24 * 31 ,
  week:1000 * 60 * 60 * 24 * 7,
  day:1000 * 60 * 60 * 24,
}


// 时间戳转换格式
let formatting = computed(()=>{
  let map = {
    year:'{y}',
    month:'{y}-{m}',
    day:'',
    week:''
  }
  return map[props.ganttType]
})
let ganttColumn = computed(()=>{
  let timestamp:number[] = []
  /**
   * 获取计划的（开始时间、结束时间、实际开始时间、实际结束时间）,反正最小时间戳和最大时间戳
   * 需要排除为空的字段
   */

  props.data.forEach((plan:any)=>{
    plan.projectPlanStartTime&&timestamp.push(Number(plan.projectPlanStartTime))
    plan.projectPlanEndTime&&timestamp.push(Number(plan.projectPlanEndTime))
    plan.projectActStartTime&&timestamp.push(Number(plan.projectActStartTime))
    plan.projectActEndTime&&timestamp.push(Number(plan.projectActEndTime))
  })


  let minTime = Math.min(...timestamp)
  let maxTime = Math.max(...timestamp)

  // 留一手
  if(minTime===0||maxTime===NaN||minTime===NaN){
    console.log('解析计划时间序列发生错误')
    return []
  }

  // 时间序列类型  年/月/周/日
  let ganttType = props.ganttType


  // 表格列数量
  let counttimestamp = timestampMap[ganttType]
  let loopCount = Math.ceil((maxTime - minTime) / counttimestamp)

  let resultColumn = []
  /**
   * 渲染表格列
   */


  for (let index = 0; index < loopCount; index++) {
    let labelTimestamp = maxTime - index*counttimestamp
    let label:any = parseTime(new Date(labelTimestamp),formatting.value)
    resultColumn.unshift({
      label,
      labelTimestamp,
      key:new Date(label).getTime()
    })
  }


  resultColumn.unshift({
    label:'重要里程碑',
    type:'planTitle',
    key:'nodeName'
  })

  return resultColumn
})

function cellClassName (row:any){
  if(row.column.label==='重要里程碑'){
    return 'plan-name'
  }

}


</script>
<style lang="scss" scoped>
.gantt-view{
  ::v-deep(.el-table){

    --el-table-border-color:rgba(56, 122, 173, 1);
    &.dark{
      background: transparent;
      tbody tr:hover>td{
        background-color: rgba(56, 122, 173, 0.2);
      }
      tr{
        background: transparent;
      }
      th.el-table__cell{
        background: transparent;
        font-size: 18px;
        color: rgba(210, 235, 255, 1);
        font-weight: 400;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        &.is-leaf{

          // border-bottom: 1px solid ;
        }
      }
    }

    .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell{
      background: none;
    }
    .el-table__row{
      .el-table__cell{
        // padding: 0!important;
        // height: 36px;
        overflow: visible;
        position: relative;
        z-index: inherit;
        min-height: 102px;
        .cell{
          overflow: visible;
          height: 36px;
          line-height: 36px;

        }

        &.plan-name{
          // background: rgba(235, 240, 247, 0.50)!important;
          background: rgba(137,126,255,0.13)!important;
          position: relative;
          z-index: 110;
          text-align: center;
        }
      }
    }

  }
}

</style>
