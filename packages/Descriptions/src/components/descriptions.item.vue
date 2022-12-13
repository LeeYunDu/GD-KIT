<template>
  <div
    class="descriptions-item"
  >
    <div class="descriptions-label">{{ field.label }}</div>
    <template v-if="field.valueFormat">
      <div class="descriptions-value">{{ getDictValue(field.valueFormat,data[field.key]) ||'-' }}</div>
    </template>
    <template v-else-if="field.parseTime">
      <div class="descriptions-value">{{ parseTime(data[field.key],field.parseTime) }}</div>
    </template>
    <template v-else>
      <div class="descriptions-value">{{ data[field.key] || '-' }}</div>
    </template>
  </div>
</template>


<script lang="ts" setup>
import { PropType,computed,inject } from 'vue'

let props = defineProps({
  data:{
    type:Object,
    default:()=>({})
  },
  field:{
    type:Object as PropType<any>,
    default:()=>({})
  },
  labelWidth:{
    type:Number,
    default:0
  }

})

let parentProps:any = inject('props')

let cLabelWidth = computed(()=>{
  return props.labelWidth + 'px'
})

let cColumn = computed(()=>{
  let width = (100 / parentProps.column) * (Number(props.field.span)||1)
  width = width>100?100:width
  return width + '%'
})

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

function getDictValue (){
  return '-'
}


</script>


<style lang="scss" scoped>
$descriptions-padding:20px 40px;
.descriptions-item{
  display: flex;
  min-width: v-bind(cColumn);

  &:last-child{
    flex: 1;
  }
  // width: #{100 / $column};
  .descriptions-label{
    width:v-bind(cLabelWidth);
    padding: $descriptions-padding;
    box-sizing: border-box;
    color:rgba(159, 210, 250, 1);
    font-size: 32px;
  }

  .descriptions-value{
    flex: 1;
    padding:$descriptions-padding;
  }
}
</style>
