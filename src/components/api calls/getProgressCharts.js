const { default: Axios } = require('axios')
const { apiUrl } = require('../../apiUrl')

const getProgressCharts = async (TeamUuid) => {
  const res = await Axios.post(`${apiUrl}/progress/charts/${TeamUuid}`)
  return res
}

export default getProgressCharts
