/**
 * 获取文件类型
 * @param filePath
 */
export function getFileType(filePath:string){
  if(!filePath){
    return ''
  }
  try {
    const index = filePath.lastIndexOf('.')
    const fileType = filePath.slice(index + 1, filePath.length).toLowerCase()
    return fileType
  } catch (error) {
    return ''
  }
  
}