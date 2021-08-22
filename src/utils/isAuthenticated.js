function isAuthenticated() {
  const user = JSON.parse(window.localStorage.getItem('user'));
  return !!(user && user.token);
}
export default isAuthenticated;
