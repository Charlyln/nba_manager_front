import { CircularProgress, Grid } from '@material-ui/core'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../../apiUrl'
import ProgressBall from '../../mutliple/ProgressBall'
import StatsHistoryCollapse from './StatsHistoryCollapse'

function StatsHistory() {
  const [isLoading, setIsLoading] = useState(true)
  const [uuid] = useState(window.localStorage.getItem('uuid'))
  const [SeasonUuid] = useState(window.localStorage.getItem('SeasonUuid'))
  const [seasonsData, setSeasonsData] = useState([])

  useEffect(() => {
    getSeasonsData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getSeasonsData = async () => {
    try {
      const UserUuid = uuid
      const res = await Axios.get(
        `${apiUrl}/seasons/history/${UserUuid}/${SeasonUuid}`
      )
      setSeasonsData(res.data)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Grid container style={{ marginTop: '100px', marginBottom: '100px' }}>
        {isLoading ? (
          <ProgressBall />
        ) : (
          <div style={{ width: '90%', margin: 'auto' }}>
            <Grid item xs={12}>
              {seasonsData
                .sort(function (a, b) {
                  return new Date(b.startYear) - new Date(a.startYear)
                })
                .map((season) => {
                  return <StatsHistoryCollapse season={season} />
                })}
            </Grid>
          </div>
        )}
      </Grid>
    </>
  )
}

export default StatsHistory
