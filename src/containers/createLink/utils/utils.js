export const deleteObjectKey = (obj, key) => {
  return Object.keys(obj).reduce((total, acc) => {
    if (Number(acc) !== key) {
      total[acc] = obj[acc]
    }
    return total
  }, {})
}
export const reorderObjectKeys = (obj) => {
  return Object.keys(obj).reduce((total, acc, index) => {
    if (index !== acc) {
      total[index] = obj[acc]
    }
    return total
  }, {})
}
