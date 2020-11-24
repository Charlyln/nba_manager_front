import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Paper
} from '@material-ui/core'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../../apiUrl'
import ProgressBall from '../../mutliple/ProgressBall'
import StatBox from './StatBox'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

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
            <Paper style={{ width: '40%' }}>
              <List subheader={<ListSubheader>My data</ListSubheader>}>
                <ListItem>
                  <ListItemText>Pseudo </ListItemText>
                  <StatBox text={myProfilData.pseudo} />
                </ListItem>
                <ListItem>
                  <ListItemText>Number of games </ListItemText>
                  <ListItemSecondaryAction>
                    <StatBox text={'78'} />
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
            <Paper style={{ width: '40%', textAlign: 'center' }}>
              <Button
                size="small"
                variant="outlined"
                endIcon={<EditIcon />}
                style={{
                  margin: '10px'
                }}
              >
                Edit profil
              </Button>
              <Button
                size="small"
                variant="outlined"
                endIcon={<DeleteIcon />}
                style={{
                  margin: '10px'
                }}
              >
                Delete profil
              </Button>
            </Paper>
          </Grid>
        </>
      )}
    </>
  )
}
export default Profil
