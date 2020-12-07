const { default: Axios } = require('axios')
const { apiUrl } = require('../../apiUrl')

const getMyPick = async (SeasonUuid, TeamUuid, UserUuid) => {
  const res = await Axios.post(
    `${apiUrl}/seasons/mydraftpick/${SeasonUuid}/${TeamUuid}/${UserUuid}`
  )
  return res
}

export default getMyPick
