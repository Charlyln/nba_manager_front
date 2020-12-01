import {
  Badge,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Paper,
  Typography
} from '@material-ui/core'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../../apiUrl'
import ProgressBall from '../../mutliple/ProgressBall'
import StatBox from './StatBox'
import DeleteProfil from './DeleteProfil'
import EditProfil from './EditProfil'
import DataUsageIcon from '@material-ui/icons/DataUsage'
import AccountVerify from '../../mutliple/AccountVerify'
import trophyIcon from '../../../images/trophyWhite.png'
import bronzeTrophy from '../../../images/bronzeTrophy.png'
import silverTrophy from '../../../images/silverTrophy.png'
import goldTrophy from '../../../images/goldTrophy.png'
import SportsEsportsIcon from '@material-ui/icons/SportsEsports'

function Profil() {
  const [isLoading, setIsLoading] = useState(true)
  const [myProfilData, setMyProfilData] = useState([])
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))
  const [TeamUuid] = useState(window.localStorage.getItem('TeamUuid'))
  const [SeasonUuid] = useState(window.localStorage.getItem('SeasonUuid'))
  const [multipleData, setMultipleData] = useState({})

  useEffect(() => {
    getAllData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAllData = async () => {
    try {
      await getMyProfil()
      await getMultipleData()
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    } catch (error) {
      console.log(error)
    }
  }

  const getMyProfil = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/users/${UserUuid}`)
      setMyProfilData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getMultipleData = async () => {
    try {
      const res = await Axios.post(`${apiUrl}/users/mulitpledata/${UserUuid}`, {
        TeamUuid,
        SeasonUuid
      })
      console.log(res.data)
      setMultipleData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getTrophyProgress = () => {
    const trophyEarned = myProfilData.Trophies.filter((trophy) => trophy.earned)

    return Math.round(
      (trophyEarned.length / myProfilData.Trophies.length) * 100
    )
  }

  const getTrophyNumber = () => {
    const trophyEarned = myProfilData.Trophies.filter((trophy) => trophy.earned)

    return trophyEarned.length
  }

  const getTrophyLeft = () => {
    const trophyLeft = myProfilData.Trophies.filter((trophy) => !trophy.earned)

    return trophyLeft.length
  }

  const checkTrophyView = () => {
    const filteredTrophies = myProfilData.Trophies.filter(
      (trophy) => trophy.earned && !trophy.isViewed
    )
    if (filteredTrophies.length > 0) {
      postViewedTrophy()
    }
  }

  const postViewedTrophy = async () => {
    try {
      const res = await Axios.post(`${apiUrl}/trophies/viewed/${UserUuid}`)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const displayItem = (thisTrophy) => {
    const rightDateFormat = new Date(thisTrophy.updatedAt)
    const date = rightDateFormat.toString().slice(4, 15)
    const hour = rightDateFormat.toString().slice(15, 21).replace(':', 'h')
    const newDate = new Date()
    const timeDifference = Math.round((newDate - rightDateFormat) / 60000)

    return (
      <ListItemText
        primary={thisTrophy.name}
        secondary={
          <Typography
            style={{
              fontSize: '0.7rem',
              color: 'rgba(255, 255, 255, 0.7)'
            }}
          >
            {thisTrophy.earned && timeDifference < 2
              ? 'Just now'
              : thisTrophy.earned
              ? `${date} - ${hour}`
              : ''}
          </Typography>
        }
      />
    )
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
          {checkTrophyView()}
          <Grid
            container
            style={{
              marginTop: '100px',
              justifyContent: 'center'
            }}
          >
            <Grid
              item
              style={{
                justifyContent: 'center',
                margin: '5px'
              }}
            >
              <Paper style={{ width: '400px' }}>
                <List
                  subheader={
                    <>
                      <ListSubheader>
                        My data <DataUsageIcon fontSize="small" />
                      </ListSubheader>
                    </>
                  }
                >
                  <ListItem>
                    <ListItemText>Pseudo</ListItemText>

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
                        style={{ marginLeft: 'auto', marginRight: '5px' }}
                        variant="button"
                        component="div"
                        color="textSecondary"
                      >
                        <strong>{myProfilData.pseudo}</strong>
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem>
                    <ListItemText>Account creation </ListItemText>
                    <ListItemSecondaryAction>
                      <ListItemText
                        secondary={`${new Date(myProfilData.createdAt)
                          .toString()
                          .slice(4, 15)}`}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText>Trophies progress</ListItemText>
                    <ListItemSecondaryAction>
                      <StatBox
                        value={getTrophyProgress()}
                        text={`${getTrophyProgress()}%`}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText>Earned Trophies</ListItemText>
                    <ListItemSecondaryAction>
                      <StatBox text={`${getTrophyNumber()}`} />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText>Trophies left</ListItemText>
                    <ListItemSecondaryAction>
                      <StatBox text={`${getTrophyLeft()}`} />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText>Seasons completed</ListItemText>
                    <ListItemSecondaryAction>
                      <StatBox text={`${multipleData.nbrSeasonsCompleted}`} />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText>Games played</ListItemText>
                    <ListItemSecondaryAction>
                      <StatBox text={`${multipleData.nbrGamePlayed}`} />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText>Wins</ListItemText>
                    <ListItemSecondaryAction>
                      <StatBox text={`${multipleData.nbrGameWined}`} />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText>Defeats</ListItemText>
                    <ListItemSecondaryAction>
                      <StatBox text={`${multipleData.nbrGameLoosed}`} />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText>Win percentage</ListItemText>
                    <ListItemSecondaryAction>
                      <StatBox
                        value={multipleData.percentageWining}
                        text={`${Math.round(multipleData.percentageWining)}%`}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Paper>
              <Paper
                style={{
                  marginTop: '10px',
                  justifyContent: 'center',
                  width: '400px',
                  textAlign: 'center',
                  padding: '15px 0px'
                }}
              >
                <EditProfil
                  myProfilData={myProfilData}
                  getMyProfil={getMyProfil}
                />
                <DeleteProfil myProfilData={myProfilData} />
              </Paper>
            </Grid>

            <Grid
              item
              style={{
                justifyContent: 'center',
                margin: '5px'
              }}
            >
              <Paper style={{ width: '400px' }}>
                <List
                  subheader={
                    <>
                      <ListSubheader>
                        Trophies
                        <SportsEsportsIcon fontSize="small" />
                      </ListSubheader>
                    </>
                  }
                >
                  {myProfilData.Trophies.sort(function (a, b) {
                    return new Date(a.difficulty) - new Date(b.difficulty)
                  }).map((trophy) => (
                    <>
                      <ListItem>
                        {displayItem(trophy)}

                        <ListItemSecondaryAction>
                          <FormControlLabel
                            control={
                              <Badge
                                disabled
                                color="error"
                                variant="dot"
                                invisible={
                                  !trophy.earned ||
                                  (trophy.isViewed && trophy.earned)
                                }
                              >
                                <Checkbox
                                  icon={
                                    <img
                                      style={{
                                        width: '30px',
                                        height: '30px',
                                        opacity: 0.1
                                      }}
                                      src={trophyIcon}
                                      alt="trophy"
                                    />
                                  }
                                  checkedIcon={
                                    <img
                                      style={{
                                        width: '30px',
                                        height: '30px'
                                      }}
                                      src={
                                        trophy.color === 'silver'
                                          ? silverTrophy
                                          : trophy.color === 'gold'
                                          ? goldTrophy
                                          : bronzeTrophy
                                      }
                                      alt="trophy"
                                    />
                                  }
                                  name="checkedH"
                                  disabled
                                  color="primary"
                                  checked={trophy.earned}
                                  style={{
                                    color: trophy.earned ? '#008B8B' : ''
                                  }}
                                />
                              </Badge>
                            }
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}
export default Profil
