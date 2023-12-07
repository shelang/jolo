import { parseCookies } from 'nookies'

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path
  return process.env.REACT_APP_BASE_URL + adjustedPath
  // return adjustedPath
}

async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return parseJSON(response)
  }
  if (response.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(response.response.data)
    console.log(response.response.status)
    console.log(response.response.headers)
  } else if (response.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(response.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', response.message)
  }
  console.log(response.config)
  return Promise.reject(await response.text())
}

async function parseJSON(response) {
  if (response && response.headers) {
    if (
      response.headers.get('Content-Type') === 'application/json;charset=UTF-8'
    ) {
      return await response.json()
    }
    if (response.headers.get('Content-Type') === 'text/plain;charset=UTF-8') {
      return await response.text()
    }
  }
  return response
}

async function ApiClient(path, options) {
  const url = formatUrl(path)
  const fetchOptions = options

  fetchOptions.headers = fetchOptions.headers || {}

  if (fetchOptions.type === 'formdata') {
    fetchOptions.body = new FormData()

    for (let key in options.data) {
      if (
        typeof key === 'string' &&
        options.data.hasOwnProperty(key) &&
        typeof options.data[key] !== 'undefined'
      ) {
        fetchOptions.body.append(key, options.data[key])
      }
    }
  } else {
    fetchOptions.body = JSON.stringify(options.data)
    fetchOptions.headers['Content-Type'] = 'application/json'
    fetchOptions.headers['Accept'] = 'application/json'
  }
  const cookies = parseCookies()

  if (Object.keys(cookies).length !== 0 && cookies.linkComposerUser) {
    const user = JSON.parse(cookies.linkComposerUser)
    const workspaceID = cookies['x-wsid'] && JSON.parse(cookies['x-wsid'])
    fetchOptions.headers.Authorization = `Bearer ${user.token}`
    if (workspaceID) fetchOptions.headers['x-wsid'] = workspaceID
  }

  return fetch(url, { ...fetchOptions })
    .then(checkStatus)
    .then(parseJSON)
    .catch((err) => {
      console.log('caught it!', err)
    })
}
export default ApiClient
