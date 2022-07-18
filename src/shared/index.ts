export const extend = Object.assign

export const isObject = (val) => val != null && typeof val === 'object'

export const hasOwn = (val, key) => Object.prototype.hasOwnProperty.call(val, key)


export const camelize = (str: String) =>
  str.replace(/-(\w)/g, (_, w) => {
    return w ? w.toUpperCase() : ''
  })

export const capitalize = (str: String) => str.charAt(0).toUpperCase() + str.substring(1)

export const toHanlderKey = (str: String) => str ? `on${capitalize(str)}` : ""