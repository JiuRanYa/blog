// 首字母大写
export const uppercaseNameFir = (initialName: string) => {
  return initialName.charAt(0).toUpperCase() + initialName.slice(1)
}

// 基础打平函数
export const baseFlatten = (target: Array<unknown>, result?: Array<unknown>) => { 
  result || (result = [])

  target.forEach(item => { 
    if (Array.isArray(item)) {
      baseFlatten(item, result)
    } else { 
      result.push(item)
    }
  })

  return result
}

// 打平函数
export const flatten = (target: Array<unknown>) => {
  if (!target) { 
    return []
  }
  return baseFlatten(target)
}