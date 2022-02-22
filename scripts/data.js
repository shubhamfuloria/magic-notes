let data
const fetchData = async () => {
  const response = await fetch('./assets/common_words.json')
  data = await response.json()
  data = data.commonWords
}
export { fetchData, data }
