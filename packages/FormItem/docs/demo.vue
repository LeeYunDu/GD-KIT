<template>
  <div>
    <div>
      双向绑定值
      {{ state.params }}
    </div>
    <el-form>
      <el-row gutter="20">
        <!-- 未单独声明的变量都存在fieldProps中 -->
        <template
          v-for="{label,key,inputType,require,span,...fieldProps} in formFields"
          :key="key"
        >
          <gd-form-item
            v-model="state.params[key]"
            :label="label"
            :span="(span??24)"
            :input-type="inputType??'input'"
            :require="require"
            v-bind="fieldProps"
          >
            <template v-if="label==='输入框插槽'" #prepend>
              prepend
            </template>
            <template v-if="label==='输入框插槽'" #append>
              append
            </template>
          </gd-form-item>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

let state = ref({
  params:{

  }
} as any)

const formFields = ref([
  { label:'输入框基础',key:'key1' },
  { label:'输入框必填',key:'key2',require:true },
  { label:'输入框带单位',key:'key3',inputUnit:'万元' },
  { label:'输入框插槽',key:'key4' },
  { label:'下拉框基础',key:'key5',inputType:'select',span:6,
    inputProps:{
      options:[
        { label:'下拉选择1',value:1 },
        { label:'下拉选择2',value:2 },
      ]
    }
  },
  { label:'下拉框 值绑定对象',key:'key6',inputType:'select',span:6,
    inputProps:{
      options:[
        { label:'下拉选择1',value:{ id:1,name:1 } },
        { label:'下拉选择2',value:{ id:1,name:2 } },
      ]
    }
  },
  { label:'下拉框 选项读取字典',key:'key5',inputType:'select',span:6,
    inputProps:{
      options:'16.dist'
    }
  },

  { label:'输入框案例1',key:'key6' },
  { label:'输入框案例1',key:'key7' },
  { label:'输入框案例1',key:'key8' },
])

</script>
