import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../../apiUrl'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  ListItem,
  TextField,
  Typography
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'

function PlayerFinder() {
  const [playersData, setPlayersData] = useState({})
  const [userUuid] = useState(window.localStorage.getItem('uuid'))
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState('')
  // const [isSearching, setIsSearching] = useState(false)
  const [namesFiltered, SetnamesFiltered] = useState([])

  const search = (e) => {
    e.preventDefault()
    if (name) {
      // setIsSearching(true)

      const arrayFiltered = playersData.filter(
        (travel) =>
          travel.lastName.toLowerCase().includes(name.toLowerCase()) ||
          travel.firstName.toLowerCase().includes(name.toLowerCase())
      )

      SetnamesFiltered(arrayFiltered)
      setName('')
      // setIsSearching(false)
    }
  }

  const reset = () => {
    SetnamesFiltered(playersData)
  }

  useEffect(() => {
    getPlayers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getPlayers = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/players/${userUuid}`)
      setPlayersData(res.data)
      SetnamesFiltered(res.data)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {isLoading ? (
        <p style={{ marginTop: '100px' }}>loading...</p>
      ) : (
        <TableContainer
          component={Paper}
          style={{ width: '90%', margin: '100px auto ' }}
        >
          <form onSubmit={search}>
            <ListItem>
              <TextField
                style={{ margin: '20px' }}
                id="outlined-basic"
                label="Player name"
                value={name}
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                type="submit"
                color="primary"
                variant="outlined"
                endIcon={<SearchIcon />}
              >
                Search
              </Button>

              <Button
                type="button"
                color="primary"
                variant="outlined"
                endIcon={<RotateLeftIcon />}
                style={{ marginLeft: '8px' }}
                onClick={reset}
              >
                Reset
              </Button>
            </ListItem>
          </form>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Photo</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Age</TableCell>
                <TableCell align="left">Conctract left</TableCell>
                <TableCell align="left">Value</TableCell>
                <TableCell align="center">Scoring</TableCell>
                <TableCell align="center">Rebound</TableCell>
                <TableCell align="center">Pass</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {namesFiltered
                .sort(function (a, b) {
                  return new Date(b.value) - new Date(a.value)
                })
                .map((player) => (
                  <TableRow>
                    <TableCell align="center" component="th" scope="row">
                      <Avatar style={{ margin: 'auto' }} src={player.photo} />
                    </TableCell>
                    <TableCell align="left">{`${player.firstName} ${player.lastName}`}</TableCell>
                    <TableCell align="left">{`${player.age}`}</TableCell>
                    <TableCell align="left">{`${player.contractLeft}`}</TableCell>
                    <TableCell align="left">
                      <Box position="relative" display="inline-flex">
                        <CircularProgress
                          variant="static"
                          value={player.value}
                        />
                        <Box
                          top={0}
                          left={0}
                          bottom={0}
                          right={0}
                          position="absolute"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography
                            variant="button"
                            component="div"
                            color="textSecondary"
                          >
                            <strong>{player.value}</strong>
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      {Math.round(
                        ((player.ptsMin + player.ptsMax) / 2 / 35) * 100
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {Math.round(
                        ((player.rebMin + player.rebMax) / 2 / 13) * 100
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {Math.round(
                        ((player.pasMin + player.pasMax) / 2 / 11) * 100
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

export default PlayerFinder
