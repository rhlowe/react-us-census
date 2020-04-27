export function fetchData(url) {
  return fetch(url)
    .then(async function(data) {
      return await data.json()
    })
}
