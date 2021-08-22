function useCache() {
  function setLocalStorage(name, item) {
    item !== undefined &&
      window.localStorage.setItem(name, JSON.stringify(item));
  }
  function getLocalStorage(name) {
    return JSON.parse(window.localStorage.getItem(name));
  }
  return [setLocalStorage, getLocalStorage];
}
export default useCache;
