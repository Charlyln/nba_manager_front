import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Axios from 'axios'
import { apiUrl } from '../../../apiUrl'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Avatar } from '@material-ui/core'
import ProgressBall from '../../mutliple/ProgressBall'

function Ranking() {
  const [isLoading, setIsLoading] = useState(true)
  const [uuid] = useState(window.localStorage.getItem('uuid'))
  const [teamsData, setTeamsData] = useState([])
  const [SeasonUuid] = useState(window.localStorage.getItem('SeasonUuid'))
  // const [TeamUuid] = useState(window.localStorage.getItem('TeamUuid'))
  const [gamesData, setGamesData] = useState([])

  useEffect(() => {
    getTeams()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getTeams = async () => {
    try {
      const UserUuid = uuid
      const res = await Axios.get(`${apiUrl}/teams/myleague/${UserUuid}`)
      setTeamsData(res.data)
      await getGames()

      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 100)
      return () => clearTimeout(timer)
    } catch (err) {
      console.log(err)
    }
  }

  const getGames = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/games/${SeasonUuid}`)
      setGamesData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getWin = (team) => {
    const array = gamesData.filter((game) => game.teamWin === team.uuid)

    return array.length
  }

  const getLoose = (team) => {
    const array = gamesData.filter((game) => game.teamLoose === team.uuid)

    return array.length
  }

  const getPourcentage = (team) => {
    const winsArray = gamesData.filter((game) => game.teamWin === team.uuid)
    const losesArray = gamesData.filter((game) => game.teamLoose === team.uuid)

    const wins = winsArray.length
    const loses = losesArray.length

    if (wins === 0) {
      return 0
    } else {
      return (Math.round((wins / (wins + loses)) * 100) / 100).toFixed(2)
    }
  }

  return (
    <>
      <Grid container style={{ marginTop: '100px', marginBottom: '100px' }}>
        {isLoading ? (
          <ProgressBall />
        ) : (
          <Grid item xs={12}>
            <Grid container justify="center">
              <TableContainer
                component={Paper}
                style={{ width: '60%', margin: '0 auto ' }}
              >
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Rank</TableCell>
                      <TableCell align="center">Team</TableCell>
                      <TableCell align="center">W</TableCell>
                      <TableCell align="center">L</TableCell>
                      <TableCell align="center">% WIN</TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {teamsData
                      .sort(function (a, b) {
                        return new Date(getWin(b)) - new Date(getWin(a))
                      })
                      .map((team, i) => (
                        <TableRow hover>
                          <TableCell align="center" component="th" scope="row">
                            {`${i + 1}`}
                          </TableCell>

                          <TableCell align="center" component="th" scope="row">
                            <Avatar
                              style={{ margin: 'auto' }}
                              src={team.logo}
                            />
                          </TableCell>
                          <TableCell align="center">{getWin(team)}</TableCell>
                          <TableCell align="center">{getLoose(team)}</TableCell>
                          <TableCell align="center">
                            {getPourcentage(team)}
                          </TableCell>
                          <TableCell align="center"></TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default Ranking
