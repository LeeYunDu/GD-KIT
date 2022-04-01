<template>
  <section class="center-query">
    <el-date-picker
      v-model="pickerValue"
      style="width:100px;height: 40px;"
      type="year"
    />
  </section>
</template>

<script setup>
import { defineProps,defineEmits, ref, watch, computed } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: ''  }
})

const propsValue = computed(() => props.modelValue)

const emit = defineEmits(['update:modelValue'])

const pickerValue = ref(propsValue.value || new Date())


watch(pickerValue,() => {
  emit('update:modelValue',pickerValue.value)
})

</script>

<style>
.el-date-picker__header-label:hover {
  color: #fff!important;
}
.el-year-table td .cell {
  color: #fff!important;
}
.el-year-table td .cell:hover {
  color: #fff!important;
}
</style>

<style lang="scss" scoped>
.center-query {
  margin-left: auto;
}
</style>
