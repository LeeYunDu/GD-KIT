<script lang='ts'>
import { defineComponent, h, ref, watchEffect } from 'vue'
interface Params {
  row:object
  column?:object
  scope?:object
}
export default defineComponent({
  name: 'Cell',
  inheritAttrs: false,
  props: {
    render: {
      type: Function,
      default: null
    },
    row: {
      type: Object,
      default: ()=>{return {}}
    },

    column: {
      type: Object,
      default: ()=>{return {}}
    },
    scope:{
      type:Object,
      default:()=>{return {}}
    }
  },

  setup (props, ctx) {
    const params = ref<Params>({
      row: props.row,
      column: props.column,
      scope:props.scope
    })

    watchEffect(() => {
      params.value.row = props.row
      params.value.column = props.column
    })
    return () => props.render(h, params.value)
  }
})
</script>
