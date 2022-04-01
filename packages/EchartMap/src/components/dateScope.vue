<template>
  <section class="center-date">
    <span class="time-label">时间：</span>
    <div class="date-btn" :class="curTime === 30 ? 'active' : ''" @click="onSetTime(30)">最近30天</div>
    <div class="date-btn" :class="curTime === 90 ? 'active' : ''" @click="onSetTime(90)">最近90天</div>
    <el-date-picker
      v-model="value"
      type="daterange"
      unlink-panels
      range-separator="-"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      value-format="x"
      clearable
    />
  </section>
</template>

<script setup>
import { defineProps, ref, watch, computed } from 'vue'


const props = defineProps({
  group: { type: Object, default: () => ({}) },
  data: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:dateScopeValue'])

const value = ref([])

watch(value, () => {
  emit('update:dateScopeValue', value.value)
  if(!value.value) return curTime.value = 0

})

const getTime = time => {
  const end = new Date()
  const start = new Date()
  const timeMap = {
    30: () => start.setTime(start.getTime() - 3600 * 1000 * 24 * 30),
    90: () => start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
  }
  timeMap[time] && timeMap[time]()
  return  [start, end]
}

const curTime = ref(0)

const onSetTime = time => {
  curTime.value = time
  value.value = getTime(time)
}

</script>

<style lang="scss" scoped>
.center-date {
  display: flex;
  align-items: center;
  .time-label {
    font-size: 16px;
    font-weight: bold;
    color: #B3F8FF;
  }
  .date-btn {
    width: 102px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    color: #B3F8FF;
    margin-right: 8px;
    background: rgba(8, 71, 194, .3);
    cursor: pointer;
    &.active {
      background: rgba(8, 71, 194, .7);
      box-shadow: inset 0 0 7px 0 #ffffff;
    }
  }
}
</style>
