import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

function AccountVerify() {
  const [uuid] = useState(window.localStorage.getItem('uuid'))
  const [SeasonUuid] = useState(window.localStorage.getItem('SeasonUuid'))
  const [TeamUuid] = useState(window.localStorage.getItem('TeamUuid'))
  const [canPlay] = useState(window.localStorage.getItem('canPlay'))

  if (!uuid || !SeasonUuid || !TeamUuid || !canPlay) {
    return <Redirect to="/" />
  }

  return <></>
}
export default AccountVerify
