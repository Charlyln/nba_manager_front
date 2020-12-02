const { default: Axios } = require('axios')
const { apiUrl } = require('../../apiUrl')

const updateSalaryCapLeft = async (UserUuid, TeamUuid) => {
  const res = await Axios.post(
    `${apiUrl}/teams/salaryCap/${UserUuid}/${TeamUuid}`
  )
  return res.data
}

module.exports = updateSalaryCapLeft
