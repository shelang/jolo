export const makingUrl = (url, linkId, params) => {
  let rv
  if (linkId) {
    rv = url.replace('<link_id>', linkId)
  } else {
    rv = url.replace('<link_id>/', '')
  }
  return rv
}
