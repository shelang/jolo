export const makingUrl = (url, linkId,queryParams) => {

  let rv
  if (linkId) {
    rv = url.replace('<link_id>', linkId)
  } else {
    rv = url.replace('<link_id>/', '')
  }
  return rv +`${queryParams?queryParams :""}`
}
