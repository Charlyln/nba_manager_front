const { default: Axios } = require('axios')
const { apiUrl } = require('../../apiUrl')

const getSeasonRewards = async (UserUuid, SeasonUuid, token) => {
  const res = await Axios.get(
    `${apiUrl}/players/bestPlayers/${UserUuid}/${SeasonUuid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return res
}

export default getSeasonRewards
