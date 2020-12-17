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
import { Avatar } from '@material-ui/core'
import ProgressBall from '../../mutliple/ProgressBall'
import AccountVerify from '../../mutliple/AccountVerify'
import allActions from '../../../actions'
import { useDispatch } from 'react-redux'
import TrainingBox from './TrainingBox'
import ChangeTrainingSliders from './ChangeTrainingSliders'

function Training() {
  const [myteamData, setMyTeamData] = useState([])
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getAllData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAllData = async () => {
    try {
      dispatch(allActions.loadingActions.setLoadingTrue())
      dispatch(allActions.tutorialActions.setGeneralStepZero())
      await getMyTeam()
      setIsLoading(false)
      dispatch(allActions.loadingActions.setLoadingFalse())
    } catch (error) {
      console.log(error)
    }
  }

  const getMyTeam = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/teams/myteam/${UserUuid}`)
      setMyTeamData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <AccountVerify />
      {isLoading ? (
        <>
          <ProgressBall />
        </>
      ) : (
        <>
          <TableContainer
            elevation={10}
            component={Paper}
            style={{ width: '90%', margin: '100px auto ' }}
          >
            <Table aria-label="simple table" className="tutoExtensions1">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Photo</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="center">Scoring intensity</TableCell>
                  <TableCell align="center">Rebounds intensity</TableCell>
                  <TableCell align="center">Assists intensity</TableCell>
                  <TableCell align="center">Change intensity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myteamData.Players.sort(function (a, b) {
                  return new Date(b.salary) - new Date(a.salary)
                }).map((player) => (
                  <TableRow>
                    <TableCell align="center" component="th" scope="row">
                      <Avatar style={{ margin: 'auto' }} src={player.photo} />
                    </TableCell>
                    <TableCell align="left">{`${player.firstName} ${player.lastName}`}</TableCell>

                    <TableCell width="10%" align="center">
                      <TrainingBox value={player.ptsTraining} />
                    </TableCell>
                    <TableCell width="10%" align="center">
                      <TrainingBox value={player.rebTraining} />
                    </TableCell>
                    <TableCell width="10%" align="center">
                      <TrainingBox value={player.pasTraining} />
                    </TableCell>

                    <TableCell align="center">
                      <ChangeTrainingSliders
                        getMyTeam={getMyTeam}
                        player={player}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  )
}

export default Training
