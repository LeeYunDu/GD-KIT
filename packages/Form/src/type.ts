export interface  FormViewProps {
  labels:Array<FormFieldsProps>
  formProps?:any
  gridProps?:any
}


/**
 * 表单字段配置
 *
 *  label 字段名
 *  prop 字段key值
 *  type 表单控件类型
 */

export interface FormFieldsProps {
  label:string
  prop:string
  type?:string

  formItemProps?:any
  inputProps:any
  gridProps?:any
}


export interface GridItemProps {

}
