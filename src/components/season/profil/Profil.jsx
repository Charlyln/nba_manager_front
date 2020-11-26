import {
  Box,
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

  return (
    <>
      {isLoading ? (
        <ProgressBall />
      ) : (
        <>
          <Grid
            container
            style={{
              marginTop: '100px',
              justifyContent: 'center'
            }}
          >
            <Paper style={{ width: '500px' }}>
              <List subheader={<ListSubheader>My data</ListSubheader>}>
                <ListItem>
                  <ListItemText>Pseudo </ListItemText>

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
                  <ListItemText>Game progress</ListItemText>
                  <ListItemSecondaryAction>
                    <StatBox value={10} text={'10%'} />
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
            container
            style={{
              marginTop: '10px',
              marginBottom: '50px',
              justifyContent: 'center'
            }}
          >
            <Paper style={{ width: '500px', textAlign: 'center' }}>
              <EditProfil
                myProfilData={myProfilData}
                getMyProfil={getMyProfil}
              />
              <DeleteProfil myProfilData={myProfilData} />
            </Paper>
          </Grid>
        </>
      )}
    </>
  )
}
export default Profil
