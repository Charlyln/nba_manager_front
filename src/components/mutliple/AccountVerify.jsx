import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { apiUrl } from '../../apiUrl'

function AccountVerify() {
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))
  const [SeasonUuid] = useState(window.localStorage.getItem('SeasonUuid'))
  const [TeamUuid] = useState(window.localStorage.getItem('TeamUuid'))
  const [canPlay] = useState(window.localStorage.getItem('canPlay'))
  const [redirect, setRedirect] = useState(false)

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

  useEffect(() => {
    AccountVerifyRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (!UserUuid || !SeasonUuid || !TeamUuid || !canPlay || redirect) {
    return <Redirect to="/" />
  }
  return <></>
}
export default AccountVerify
