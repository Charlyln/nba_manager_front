import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../../apiUrl'
import { Grid } from '@material-ui/core'
import StatsCollapse from './StatsCollapse'
import ProgressBall from '../../mutliple/ProgressBall'
import AccountVerify from '../../mutliple/AccountVerify'

function Stats() {
  const [isLoading, setIsLoading] = useState(true)
  const [myteamData, setMyTeamData] = useState('')
  const [userUuid] = useState(window.localStorage.getItem('uuid'))
  const [SeasonUuid] = useState(window.localStorage.getItem('SeasonUuid'))

  useEffect(() => {
    getMyTeamStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getMyTeamStats = async () => {
    try {
      const res = await Axios.get(
        `${apiUrl}/teams/myteam/stats/${userUuid}/${SeasonUuid}`
      )
      setMyTeamData(res.data)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <AccountVerify />
      {isLoading ? (
        <ProgressBall />
      ) : (
        <Grid style={{ marginTop: '100px', marginBottom: '100px' }}>
          <div style={{ width: '90%', margin: 'auto' }}>
            {myteamData.Players.sort(function (a, b) {
              return new Date(b.value) - new Date(a.value)
            }).map((player) => {
              return <StatsCollapse player={player} SeasonUuid={SeasonUuid} />
            })}
          </div>
        </Grid>
      )}
    </>
  )
}

export default Stats
