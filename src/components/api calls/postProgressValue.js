const { default: Axios } = require('axios')
const { apiUrl } = require('../../apiUrl')

const postProgressValue = async (UserUuid, SeasonUuid) => {
  const res = await Axios.post(
    `${apiUrl}/players/progressValue/${UserUuid}/${SeasonUuid}`
  )
  return res.data
}

export default postProgressValue
