import { refreshToken } from './refreshToken';
import nookies, { parseCookies } from 'nookies';
function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  return process.env.REACT_APP_BASE_URL + adjustedPath;
  // return adjustedPath
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return parseJSON(response);
  } else if (response.status === 401) {
    refreshToken();
  }
  return response.json().then((json) => Promise.reject(json));
}

async function parseJSON(response) {
  if (response && response.headers) {
    if (response.headers.get('Content-Type') === 'application/json') {
      return await response.json();
    }
    if (response.headers.get('Content-Type') === 'text/plain;charset=UTF-8') {
      return await response.text();
    }
  }
  return response;
}

async function ApiClient(path, options) {
  const url = formatUrl(path);
  const fetchOptions = options;

  fetchOptions.headers = fetchOptions.headers || {};

  if (fetchOptions.type === 'formdata') {
    fetchOptions.body = new FormData();

    for (let key in options.data) {
      if (
        typeof key === 'string' &&
        options.data.hasOwnProperty(key) &&
        typeof options.data[key] !== 'undefined'
      ) {
        fetchOptions.body.append(key, options.data[key]);
      }
    }
  } else {
    fetchOptions.body = JSON.stringify(options.data);
    fetchOptions.headers['Content-Type'] = 'application/json';
    fetchOptions.headers['Accept'] = 'application/json';
  }

  const cookies = parseCookies();
  if (Object.keys(cookies).length !== 0 && cookies.user) {
    const user = JSON.parse(cookies.user);
    fetchOptions.headers.Authorization = `Bearer ${user.token}`;
  }

  return fetch(url, { ...fetchOptions })
    .then(checkStatus)
    .then(parseJSON);
}
export default ApiClient;
