const { default: Axios } = require('axios')
const { apiUrl } = require('../../apiUrl')

const getChartsData = async (UserUuid, TeamUuid, SeasonUuid) => {
  const res = await Axios.post(`${apiUrl}/teams/myteam/charts/${UserUuid}`, {
    SeasonUuid,
    TeamUuid
  })
  return res
}

export default getChartsData
