import { parseCookies } from 'nookies';

function isAuthenticated() {
  const cookies = parseCookies();
  const user = JSON.parse(cookies.user);

  return user && user.token;
}
export default isAuthenticated;
