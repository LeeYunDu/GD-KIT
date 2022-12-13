<template>
  <div
    class="tag dark"

    @click="onClick"
  >
    <div
      class="cell-content"
      :class="getTagClass"
    >
      {{ propsCellContent }}
    </div>
  </div>
</template>

<script lang="ts" setup>

import { inject,computed } from 'vue'

let props = defineProps({
  tagType:{
    type:String,
    default:''
  },
  row:{
    type:Object,
    default:()=>({})
  },
  cellStyle:{
    type:Object,
    default:()=>({})
  }
})


let ganttType = inject('ganttType')

let propsCellWidth = computed(()=>{
  return props.cellStyle.width*100 + '%'
})

let propsCellOffset = computed(()=>{
  return props.cellStyle.offset *(100) + '%'
})

let propsCellContent = computed(()=>{
  return props.cellStyle.content
})

let getTagClass = computed(()=>{
  let tagClass = ''
  switch(props.tagType){
    case '0':
      tagClass = 'plan-tag'
      break
    case '1':
      tagClass = 'befor-tag'
      break
    case '2':
      tagClass = 'normal-tag'
      break
    case '3':
      tagClass = 'overdue-tag'
      break
    case '4':
      tagClass = 'no-end-tag'
      break
  }
  return [tagClass]
})


let emits = defineEmits(['planClick'])
function onClick (){
  emits('planClick',Object.assign({},props.row,{ tagType:props.tagType }))
}

</script>
<style lang="scss" scoped>


.tag{
  height: 72px;
  text-align: center;
  cursor: pointer;
  position: absolute;
  z-index: 100;
  left: 0px;
  min-width: 100%;
  width: v-bind(propsCellWidth);
  margin-left: v-bind(propsCellOffset);
  padding: 0 12px;

  .cell-content{
    border-radius: 12px 12px 12px 12px;
    line-height: 72px;
    color: rgba(255, 255, 255, 1);
    &.plan-tag{
      background: #EBF3FF;
    }

    &.no-end-tag{
      background: #F8F8F8;
      padding-left: 162px;
      width: 400px;
      $color:rgba(255, 132, 23, 0.20);
      color: rgba(102, 102, 102, 1);
      border: 1px solid rgba(214, 214, 214, 1);

      &::after{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        z-index: 9;
        width: 152px;
        height: 100%;
        box-sizing: border-box;
        border-radius: 8px;
        background-size: 16px 16px; /* 控制条纹的大小 */
        background-color: $color;
        border: 1px solid  $color;
        background-image: -webkit-gradient(linear, 0 0, 100% 100%,
                                color-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent),
                                color-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)),
                                color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent),
                                to(transparent));
        background-image: -moz-linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%,
                            transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%,
                            transparent 75%, transparent);
        background-image: -o-linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%,
                            transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%,
                            transparent 75%, transparent);
        background-image: linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%,
                            transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%,
                            transparent 75%, transparent);

      }
    }

    &.overdue-tag{
      $color: rgba(238,39,19,0.2);
      background-size: 10px 10px; /* 控制条纹的大小 */
      background-color: $color;
      border: 1px solid  $color;
      background-image: -webkit-gradient(linear, 0 0, 100% 100%,
                              color-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent),
                              color-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)),
                              color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent),
                              to(transparent));
      background-image: -moz-linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%,
                          transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%,
                          transparent 75%, transparent);
      background-image: -o-linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%,
                          transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%,
                          transparent 75%, transparent);
      background-image: linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%,
                          transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%,
                          transparent 75%, transparent);
    }

    &.normal-tag{
      $color: rgba(35,203,77,0.2);
      background-size: 10px 10px; /* 控制条纹的大小 */
      background-color: $color;
      border: 1px solid  $color;
      background-image: -webkit-gradient(linear, 0 0, 100% 100%,
                              color-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent),
                              color-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)),
                              color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent),
                              to(transparent));
      background-image: -moz-linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%,
                          transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%,
                          transparent 75%, transparent);
      background-image: -o-linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%,
                          transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%,
                          transparent 75%, transparent);
      background-image: linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%,
                          transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%,
                          transparent 75%, transparent);
    }

    &.befor-tag{
      $color: rgba(18,125,247,0.18);
      background-size: 10px 10px; /* 控制条纹的大小 */
      background-color: $color;
      border: 1px solid  $color;
      background-image: -webkit-gradient(linear, 0 0, 100% 100%,
                              color-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent),
                              color-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)),
                              color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent),
                              to(transparent));
      background-image: -moz-linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%,
                          transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%,
                          transparent 75%, transparent);
      background-image: -o-linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%,
                          transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%,
                          transparent 75%, transparent);
      background-image: linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%,
                          transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%,
                          transparent 75%, transparent);
    }
  }



  &.dark{

    .cell-content{
      &.plan-tag{
        background: rgba(0, 133, 238, 1);
      }

      &.befor-tag{
        background: rgba(243, 148, 20, 1);
      }
      &.normal-tag{
        background: rgba(5, 183, 119, 1);
      }
      &.overdue-tag{
        background: rgba(255, 82, 82, 1);
      }
      &.no-end-tag{
        background: rgba(5,183,119,0.31);
        color: white;
        border:none;
        &::after{
          background: #05B777;
        }
      }
    }

  }
}


</style>
