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
          v-for="{label,key,inputType,require,span,inputData,...fieldProps} in formFields"
          :key="key"
        >
          <gd-form-item
            v-model="state.params[key]"
            :label="label"
            :span="(span??24)"
            :input-type="inputType??'input'"
            :require="require"
            v-bind="fieldProps"
            :form-data="inputData?state.params:{}"
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
    valueKey:'value',
    inputProps:{
      options:[
        { label:'下拉选择1',value:1 },
        { label:'下拉选择2',value:2 },
      ]
    }
  },
  { label:'下拉框选项读取字典',key:'key7',inputType:'select',span:6,
    inputProps:{
      options:'16.dist'
    }
  },
  { label:'下拉选项自定义选项key',key:'key8',inputType:'select',span:6,
    selectValueKey:'valueRange',
    inputProps:{
      options:[
        { label:'下拉选择1',value:1,valueRange:'100' },
        { label:'下拉选择2',value:2,valueRange:'1000' },
      ]
    }
  },

  { label:'日期选择器(年月周日)',key:'key9',inputType:'date',
    // type:'year',
    // type:'month',
    // type:'week',
    type:'day',
    span:6
  },
  { label:'日期选择器返回格式',key:'key10',inputType:'date',type:'day',span:6,
    // valueFormat: 'x'
    valueFormat: 'YYYYMM'
    // valueFormat: 'YYYY-MM-DD'
  },
  { label:'日期范围',key:'key11',inputType:'date',type:'datetimerange',span:12,
    inputData:true,
    timerangeFields:['startTime','endTime']
  },
  { label:'单选框',key:'key12',inputType:'radio',span:12,
    inputProps:{
      options:[
        { label:'单选1',value:1 },
        { label:'单选2',value:2 },
      ]
    }
  },
  {
    label:'单选选项读取字典',key:'key13',inputType:'radio',span:12,
    inputProps:{  options:'16.dist' }
  },
  { label:'复选框',key:'key14',inputType:'checkbox',span:6,
    inputProps:{
      options:[
        { label:'复选1',value:1 },
        { label:'复选2',value:2 },
      ]
    }
  },
  { label:'复选框选项读取字典',key:'key15',inputType:'checkbox',span:6,
    inputProps:{  options:'16.dist' }
  },
  { label:'复选值绑定对象',key:'key16',inputType:'checkbox',span:6,
    valueKey:'value',
    inputProps:{
      options:[
        { label:'复选1',value:1 },
        { label:'复选2',value:2 },
      ]
    }
  },
])

</script>
