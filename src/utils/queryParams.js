export function encodeQueryData(data) {
  const ret = [];
  for (let d in data)
    if (data[d]) {
      if (typeof data[d] === 'object') {
        data[d].forEach((query) => {
          ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(query));
        });
      } else {
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
      }
    }
  return ret.join('&');
}
