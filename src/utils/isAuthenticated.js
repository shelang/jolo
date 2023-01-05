import { parseCookies } from 'nookies'

function isAuthenticated() {
  const cookies = parseCookies()
  if (cookies.user) {
    const user = JSON.parse(cookies.linkComposerUser)

    return user && user.token
  } else {
    return
  }
}
export default isAuthenticated
