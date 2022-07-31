import { apiRoutes } from './apiRoutes'

export const makingUrl = (chartType,linkedId) => {
  if (linkedId) {
    const array = apiRoutes[chartType].split('/')
    array.splice(1, 0, linkedId).toString()
    const urlText = array.toString()
    const URL = urlText.replaceAll(',', '/')
    return URL
  }
  return apiRoutes[chartType]
}
