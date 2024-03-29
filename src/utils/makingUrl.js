export const makingUrl = (url, linkId, queryParams) => {
  let rv
  if (linkId) {
    rv = url.replace('<link_id>', linkId)
  } else {
    rv = url.replace('<link_id>/', '')
  }
  if (Object.keys(queryParams).length) {
    rv = rv + `?from=${queryParams.from}&to=${queryParams.to}`
  }
  return rv
}
