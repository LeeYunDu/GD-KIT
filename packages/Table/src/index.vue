<template>
  <div class="custom-table-container">
    <el-table
      v-bind="$attrs"
      :data="tableDataApi?tableData:defaultData"
      border
      class="custom-table"
      :cell-style="{'text-align':'center'}"
      :header-cell-style="{'text-align':'center'}"
      header-cell-class-name="custom-table-header"
    >
      <template v-for="(item,index) in tabelColumn" :key="setKey(item,index)">
        <template v-if="item.columns">
          <el-table-column :label="item.label">
            <tableColumn
              v-for="(columnItem,columnIndex) in item.columns"
              :key="setKey(columnItem,columnIndex)"
              :column="columnItem"
            />
          </el-table-column>
        </template>
        <template v-else-if="item.slot">
          <el-table-column
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :prop="item.prop"
          >
            <template #default="scope">
              <slot :name="item.prop" :data="scope">
              </slot>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <tableColumn :column="item" />
        </template>
      </template>

      <!-- 自定义插槽 -->
      <slot name="tabelColumn"></slot>
    </el-table>
    <!-- 分页按钮 -->
    <pagination
      v-if="showPagination&&pagination"
      :current-page="pageConfig.current"
      :page-size="pageConfig.size"
      :total="total"
      :page-sizes="pageSizes"
      @current-change="changePage"
      @size-change="changePageSize"
    />
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, PropType, reactive, ref, watch, onMounted } from 'vue'
import { ItableQuery } from './types/index'
import tableColumn from './components/tableColumn.vue'
import pagination from './components/pagination.vue'
export default defineComponent({
  name: 'CustomTable',
  components: {
    tableColumn, pagination
  },
  props: {
    pageSizes: {
      type: Array as any,
      default () {
        return []
      }
    },
    // 直接传入数据
    defaultData: {
      default: () => [],
      type: Array as PropType<Array<any>>
    },
    // 表格列
    tabelColumn: {
      type: Array as PropType<Array<any>>,
      default: () => []
    },
    // 获取列表接口
    tableDataApi: {
      default: null,
      type: Function
    },
    // 获取列表参数
    tableQuery: {
      default:()=> {},
      type: Object as PropType<ItableQuery>
    },
    // 表格循环渲染 key值
    loopKey: {
      type: String,
      default: 'id'
    },
    pagination:{
      type:Boolean,
      default:true
    }
  },
  emits: ['success', 'changePage', 'changePageSize'],
  setup (props:any, ctx) {
    const tableData = ref<Array<any>>(props.defaultData||[])
    const total = ref<any>(0)
    const loading = ref<boolean>(false)
    const showPagination = computed(() => { return total.value > 0 })

    // 接口分页默认参数
    const pageConfig = reactive({
      current: 1,
      size: (props as any).tableQuery?.size || 10
    })
    /**
     * 请求接口数据
     */
    const handlerApiData = () => {
      const query = Object.assign({}, (props as any).tableQuery, pageConfig)
      loading.value = true
      props.tableDataApi&&props.tableDataApi(query).then((res:any) => {
        loading.value = false
        if (res.code === 0) {
          let data:Array<any> = []
          data = res.data.records
          // 接口字段  每个项目都需要跟后台协商好 列表返回所取的字段
          // 数据需要特殊处理
          tableData.value = data
          total.value = Number(res.data.total)
          // 抛出成功事件
          ctx.emit('success', data)
        }
      })
    }
    /**
     * 更新表格数据
     */
    const updateTableData = () => {
      ((props as any).tableDataApi) && handlerApiData()
    }

    // 更改页面
    const changePage = (current:number) => {
      // 如果传入默认数据 抛出 当前页码变更 事件
      if ((props as any).defaultData.length > 0) {
        ctx.emit('changePage', current)
      } else {
        pageConfig.current = current
        handlerApiData()
      }
    }
    const changePageSize = (size:number) => {
      ctx.emit('changePageSize', size)
      pageConfig.size = size
      handlerApiData()
    }

    onMounted(() => {
      /**
       * 计算表格高度
       */

      if(props.defaultData.length===0)handlerApiData()

    })

    // 在 v-for 循环渲染数据中不使用index作为key值,默认采用数据中的id字段作为唯一值,避免数据错位和性能消耗
    const setKey = (item:any, index:number) => {
      if ((props as any).loopKey in item) {
        return item[(props as any).loopKey]
      } else {
        return index
      }
    }
    return {
      tableData,
      loading,
      total, showPagination,
      updateTableData,
      changePage, pageConfig, changePageSize,
      setKey,
    }
  }
})
</script>

<style lang='scss' scoped>
.custom-table-container {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  ::v-deep(.el-table) {
    &::before {
      display: none;
    }
    .el-table__header-wrapper {
      background: #f7f8fa;
    }
  }
}
.pagination-box {
  padding: 0;
  padding-top: 10px;
  display: flex;
  justify-content: flex-end;
}
.custom-table {
  flex: 1;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}

</style>
<style lang='scss'>
.column_sky {
  color: #00eaff;
}
.custom-table {
  .custom-table-header {
    background-color: #f7f8fa;
    font-size: 12px;
    color: #666666;
    padding: 6px 0;
    // padding: 0;
  }
  .el-table__row {
    td {
      padding: 6px 0 !important;
    }
  }
}

</style>
