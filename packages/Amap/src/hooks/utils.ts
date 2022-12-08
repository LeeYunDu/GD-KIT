export function calculateCenter (lnglatarr: any) {
  const total = lnglatarr.length
  let X = 0
  let Y = 0
  let Z = 0
  lnglatarr.map((lnglat: number[]) => {
    const lng = lnglat[0] * Math.PI / 180
    const lat = lnglat[1] * Math.PI / 180
    const x = Math.cos(lat) * Math.cos(lng)
    const y = Math.cos(lat) * Math.sin(lng)
    const z = Math.sin(lat)
    X += x
    Y += y
    Z += z
  })
  X = X / total
  Y = Y / total
  Z = Z / total
  const Lng = Math.atan2(Y, X)
  const Hyp = Math.sqrt(X * X + Y * Y)
  const Lat = Math.atan2(Z, Hyp)
  return new AMap.LngLat(Lng * 180 / Math.PI, Lat * 180 / Math.PI)
}


export function is (val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isString (val: unknown): val is string {
  return is(val, 'String')
}


export function isArray (val: any): val is Array<any> {
  return val && Array.isArray(val)
}
