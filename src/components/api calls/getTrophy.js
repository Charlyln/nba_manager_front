const { default: Axios } = require('axios')
const { apiUrl } = require('../../apiUrl')

const getTrophy = async (UserUuid, trophyName) => {
  const res = await Axios.get(`${apiUrl}/trophies/${trophyName}/${UserUuid}`)
  return res
}

export default getTrophy
