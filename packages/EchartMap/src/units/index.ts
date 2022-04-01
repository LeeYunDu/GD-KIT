export function getGeoJSON (areaName:string){
  return new Promise((resolve,reject)=>{
    try {
      import(`../json/${areaName}.json`).then(res=>{
        resolve(res)
      })
    } catch (error) {
      reject(error)
    }
  })

}

// export  const getAssetsFile = (url: string) => {
//   return new URL(`../json/${areaName}.json`, import.meta.url).href
// }
