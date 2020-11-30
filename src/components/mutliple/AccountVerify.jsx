import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { apiUrl } from '../../apiUrl'

function AccountVerify() {
  // const history = useHistory()
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))
  const [SeasonUuid] = useState(window.localStorage.getItem('SeasonUuid'))
  const [TeamUuid] = useState(window.localStorage.getItem('TeamUuid'))
  const [canPlay] = useState(window.localStorage.getItem('canPlay'))
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    AccountVerifyRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!UserUuid || !SeasonUuid || !TeamUuid || !canPlay || redirect) {
    return <Redirect to="/" />
  }
  const AccountVerifyRequest = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/users/account/${UserUuid}`)
      if (!res.data) {
        window.localStorage.removeItem('uuid')
        console.log('not found')
        setRedirect(true)
      } else {
        console.log('found')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return <></>
}
export default AccountVerify
