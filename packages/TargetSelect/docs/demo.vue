<template>
  <div>
    <gd-target-select
      v-model:checked="state.selectPerson"
      v-model:ids="state.selectIds"
      v-model:labels="state.selectLabels"
      :data="state.data"
      title="用户选择"
      :props="{label: 'name',id:'id'}"
      @submit="selectResult"
    />
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'

let state = reactive({
  selectPerson:[],
  selectIds:'',
  selectLabels:'',
  data:[

    {
      name: 'Level one 2',
      id:'2',
      children: [
        {
          name: 'Level two 2-1',
          id:'2-1',
          children: [
            {
              name: 'Level three 2-1-1',
              id:'2-1-1',
            },
          ],
        },
        {
          name: 'Level two 2-2',
          id:'2-2',
          children: [
            {
              name: 'Level three 2-2-1',
              id:'2-2-1',
            },
          ],
        },
      ],
    },
  ]
})

function selectResult (){

}
</script>
