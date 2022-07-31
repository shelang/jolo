export const makingUrl = (url, linkId) => {
  let rv
  if (linkId) {
    rv = url.replace('<link_id>', linkId)
  } else {
    rv = url.replace('<link_id>/', '')
  }
  console.log(rv)
  return rv
}
