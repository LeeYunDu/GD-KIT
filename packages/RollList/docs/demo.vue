<template>
  <div class="box-1">
    <div class="title">垂直滚动案例</div>
    <div class="dome-list">
      <gd-roll-list :data="mockData" :options="mockOption">
        <div v-for="(item,index) in 10" :key="index" class="test-item">{{ index }}</div>
      </gd-roll-list>
    </div>
  </div>
  <div class="box-2">
    <div class="title">水平滚动案例</div>
    <gd-roll-list :data="mockData" :options="mockOption2" class="warp">
      <div class="flex-box">
        <div v-for="(item,index) in 10" :key="index" class="flex-item">{{ index }}</div>
      </div>
    </gd-roll-list>
  </div>
</template>

<script lang="ts" setup>

let mockOption = {
  step: 1, // 数值越大速度滚动越快
  limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
  hoverStop: true, // 是否开启鼠标悬停stop
  direction: 1, // 0向下 1向上 2向左 3向右
  openWatch: true, // 开启数据实时监控刷新dom
  singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
  singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
  waitTime: 1000 // 单步运动停止的时间(默认值1000ms)

}
let mockData = []
let mockOption2 = {
  step: 5, // 数值越大速度滚动越快
  limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
  hoverStop: true, // 是否开启鼠标悬停stop
  direction: 2, // 0向下 1向上 2向左 3向右
  openWatch: true, // 开启数据实时监控刷新dom
  singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
  singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
  waitTime: 1000 // 单步运动停止的时间(默认值1000ms)

}

</script>


<style scoped lang="scss">

.warp{
  width: 500px;
  overflow: hidden;
}
.flex-box{
  display: flex;
  .flex-item{
    width: 120px;
    height: 120px;
    margin-right: 10px;
  }
}

.box-1{
  display: flex;
  flex-direction: column;
  height: 600px;
  .title{
    height: 100px;
  }
}
.dome-list{
  flex: 1;
  overflow: hidden;
  .test-item{
    height: 100px;
    width: 300px;
    border: 1px solid blue;
    margin-bottom: 10px;
  }
}
</style>
