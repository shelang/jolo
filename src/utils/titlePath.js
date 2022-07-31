export function titleCase(str = '') {
  return str && toPascalCase(str.toString(), true)
}
export function toPascalCase(string, title = false) {
  return (
    string &&
    string.replace(/(_[a-z])?(^[a-z])?(_|\s[a-z])?/g, ($1) =>
      $1.toUpperCase().replace('_', title ? ' ' : ''),
    )
  )
}
