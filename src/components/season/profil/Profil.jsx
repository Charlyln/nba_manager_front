import {
  Badge,
  Box,
  Checkbox,
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
import trophy from '../../../trophyWhite.png'

function Profil() {
  const [isLoading, setIsLoading] = useState(true)
  const [myProfilData, setMyProfilData] = useState([])
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))

  useEffect(() => {
    getMyProfil()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getMyProfil = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/users/${UserUuid}`)
      setMyProfilData(res.data)

      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      return () => clearTimeout(timer)
    } catch (err) {
      console.log(err)
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
          <Badge
            color="error"
            variant="dot"
            invisible={
              !thisTrophy.earned || (thisTrophy.earned && timeDifference > 1)
            }
          >
            <Typography
              style={{
                fontSize: '0.7rem',
                color: 'rgba(255, 255, 255, 0.7)'
              }}
            >
              {thisTrophy.earned && timeDifference < 3
                ? 'Just now'
                : thisTrophy.earned
                ? `${date} - ${hour}`
                : ''}
            </Typography>
          </Badge>
        }
      />
    )
  }

  return (
    <>
      {isLoading ? (
        <>
          <AccountVerify />
          <ProgressBall />
        </>
      ) : (
        <>
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
                        My data <DataUsageIcon />
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
                    <ListItemText>Account creation date </ListItemText>
                    <ListItemSecondaryAction>
                      <ListItemText
                        secondary={`${new Date(myProfilData.createdAt)
                          .toString()
                          .slice(4, 15)}`}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText>Earned trophies progress</ListItemText>
                    <ListItemSecondaryAction>
                      <StatBox
                        value={getTrophyProgress()}
                        text={`${getTrophyProgress()}%`}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText>Earned trophies number</ListItemText>
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
                    <ListItemText>Number of games played</ListItemText>
                    <ListItemSecondaryAction>
                      <StatBox text={'78'} />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText>Number of seasons played</ListItemText>
                    <ListItemSecondaryAction>
                      <StatBox text={'4'} />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText>Number of wins </ListItemText>
                    <ListItemSecondaryAction>
                      <StatBox text={'56'} />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText>Percentage of win </ListItemText>
                    <ListItemSecondaryAction>
                      <StatBox value={52} text={'52%'} />
                    </ListItemSecondaryAction>
                  </ListItem>

                  <ListItem>
                    <ListItemText>Most points in a game </ListItemText>
                    <ListItemSecondaryAction>
                      <StatBox x text={'149'} />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
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
                        <img
                          style={{
                            width: '20px',
                            height: '20px',
                            margin: '0px 0px 3px 0px'
                          }}
                          src={trophy}
                          alt="trophy"
                        />
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
                          <Checkbox
                            disabled
                            color="primary"
                            checked={trophy.earned}
                            style={{ color: trophy.earned ? '#008B8B' : '' }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </>
                  ))}
                </List>
              </Paper>

              <Paper
                style={{
                  marginTop: '10px',
                  justifyContent: 'center',
                  width: '400px',
                  textAlign: 'center'
                }}
              >
                <EditProfil
                  myProfilData={myProfilData}
                  getMyProfil={getMyProfil}
                />
                <DeleteProfil myProfilData={myProfilData} />
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}
export default Profil
