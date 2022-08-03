export const deleteObjectKey = (obj, key) => {
    return Object.keys(obj).reduce((total, acc) => {
      if (Number(acc) !== key) {
        total[acc] = obj[acc]
      }
      return total
    }, {})
  }