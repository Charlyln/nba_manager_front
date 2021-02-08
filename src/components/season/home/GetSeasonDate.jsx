import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import allActions from '../../../actions'
import { apiUrl } from '../../../apiUrl'

function GetSeasonDate() {
  const [SeasonUuid] = useState(localStorage.getItem('SeasonUuid'))
  const dispatch = useDispatch()

  const getSeasonDate = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/seasons/date/${SeasonUuid}`)
      dispatch(allActions.seasondDateActions.setSeasonDate(res.data.startYear))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getSeasonDate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <></>
}
export default GetSeasonDate
