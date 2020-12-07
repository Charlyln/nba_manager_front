const { default: Axios } = require('axios')
const { apiUrl } = require('../../apiUrl')

const getMyRookies = async (UserUuid, rookieTeam) => {
  const res = await Axios.post(
    `${apiUrl}/players/myrookies/${UserUuid}/${rookieTeam}`
  )
  return res
}

export default getMyRookies
