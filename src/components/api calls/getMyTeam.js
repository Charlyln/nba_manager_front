const { default: Axios } = require('axios')
const { apiUrl } = require('../../apiUrl')

const getMyTeam = async (UserUuid) => {
  const res = await Axios.get(`${apiUrl}/teams/myteam/${UserUuid}`)
  return res
}

module.exports = getMyTeam
