const toString = Object.prototype.toString

export function is (val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isDef<T = unknown> (val?: T): val is T {
  return typeof val !== 'undefined'
}

export function isUnDef<T = unknown> (val?: T): val is T {
  return !isDef(val)
}

export function isObject (val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}

export function isEmpty<T = unknown> (val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

export function isDate (val: unknown): val is Date {
  return is(val, 'Date')
}

export function isNull (val: unknown): val is null {
  return val === null
}

export function isNullAndUnDef (val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val)
}

export function isNullOrUnDef (val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val)
}

export function isNumber (val: unknown): val is number {
  return is(val, 'Number')
}

export function isPromise<T = any> (val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isString (val: unknown): val is string {
  return is(val, 'String')
}

export function isFunction (val: unknown) {
  return typeof val === 'function'
}

export function isBoolean (val: unknown): val is boolean {
  return is(val, 'Boolean')
}

export function isRegExp (val: unknown): val is RegExp {
  return is(val, 'RegExp')
}

export function isArray (val: any): val is Array<any> {
  return val && Array.isArray(val)
}

export function isJsonString (val: unknown): val is string {
  return is(val, 'String') && ['[', '{'].includes(String(val).substring(0, 1))
}

export function isWindow (val: any): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window')
}

export function isElement (val: unknown): val is Element {
  return isObject(val) && !!val.tagName
}

export const isServer = typeof window === 'undefined'

export const isClient = !isServer

export function isUrl (path: string): boolean {
  const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}


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
