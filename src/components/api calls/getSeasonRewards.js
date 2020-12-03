const { default: Axios } = require('axios')
const { apiUrl } = require('../../apiUrl')

const getSeasonRewards = async (UserUuid, SeasonUuid) => {
  const res = await Axios.get(
    `${apiUrl}/players/bestPlayers/${UserUuid}/${SeasonUuid}`
  )
  return res
}

export default getSeasonRewards
