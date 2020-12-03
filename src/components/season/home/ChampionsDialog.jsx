import React, { useEffect, useState } from 'react'
import styles from './championsDialog.module.css'
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  DialogTitle,
  Grid,
  Tooltip
} from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import getSeasonRewards from '../../api calls/getSeasonRewards'
import mvpLogo from '../../../images/finalMvp.png'

function ChampionsDialog({ teamsData, SeasonUuid, UserUuid }) {
  const [open, setOpen] = useState('')
  const [rewardsData, setRewardsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getAllData = async () => {
    setOpen(true)
    const res = await getSeasonRewards(UserUuid, SeasonUuid)
    setRewardsData(res.data)
    setIsLoading(false)
  }
  useEffect(() => {
    if (!teamsData.find((game) => !game.team1)) {
      getAllData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamsData])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      {isLoading ? (
        ''
      ) : (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <>
            <DialogContent>
              <Grid container>
                <Grid item xs={6} sm={6}>
                  <DialogTitle id="alert-dialog-title">{`Season rewards`}</DialogTitle>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <Tooltip title="Most Valuable Player" arrow>
                    <Button
                      style={{ float: 'right' }}
                      color="primary"
                      variant="contained"
                    >
                      MVP
                    </Button>
                  </Tooltip>
                </Grid>

                <Grid item xs={12}>
                  <DialogTitle>
                    <p
                      className={styles.playerName}
                    >{`${rewardsData[0].firstName} ${rewardsData[0].lastName}`}</p>
                  </DialogTitle>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <Avatar
                    style={{
                      margin: 'auto',
                      width: '150px',
                      height: '150px'
                    }}
                    src={rewardsData[0].photo}
                  />
                </Grid>

                <Grid
                  item
                  xs={6}
                  sm={6}
                  style={{ width: '150px', textAlign: 'center' }}
                >
                  <img
                    alt="stephen curry"
                    src={mvpLogo}
                    style={{ width: '110px' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TableContainer
                    elevation={10}
                    component={Paper}
                    style={{ margin: '20px 0px 10px 0px' }}
                  >
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ color: 'gray' }} align="center">
                            Pts
                          </TableCell>
                          <TableCell style={{ color: 'gray' }} align="center">
                            Reb
                          </TableCell>
                          <TableCell style={{ color: 'gray' }} align="center">
                            Ast
                          </TableCell>
                          <TableCell style={{ color: 'gray' }} align="center">
                            Blk
                          </TableCell>
                          <TableCell style={{ color: 'gray' }} align="center">
                            Stl
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="center">{`${(
                            rewardsData[0].PlayerStats.reduce(
                              (a, v) => (a = a + v.pts),
                              0
                            ) / rewardsData[0].PlayerStats.length
                          ).toFixed(1)}`}</TableCell>

                          <TableCell align="center">{`${(
                            rewardsData[0].PlayerStats.reduce(
                              (a, v) => (a = a + v.reb),
                              0
                            ) / rewardsData[0].PlayerStats.length
                          ).toFixed(1)}`}</TableCell>
                          <TableCell align="center">{`${(
                            rewardsData[0].PlayerStats.reduce(
                              (a, v) => (a = a + v.pas),
                              0
                            ) / rewardsData[0].PlayerStats.length
                          ).toFixed(1)}`}</TableCell>
                          <TableCell align="center">{`${(
                            rewardsData[0].PlayerStats.reduce(
                              (a, v) => (a = a + v.blk),
                              0
                            ) / rewardsData[0].PlayerStats.length
                          ).toFixed(1)}`}</TableCell>
                          <TableCell align="center">{`${(
                            rewardsData[0].PlayerStats.reduce(
                              (a, v) => (a = a + v.stl),
                              0
                            ) / rewardsData[0].PlayerStats.length
                          ).toFixed(1)}`}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>
                close
              </Button>
            </DialogActions>
          </>
        </Dialog>
      )}
    </>
  )
}
export default ChampionsDialog
