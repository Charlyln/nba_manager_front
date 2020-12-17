import { Fab, Grid, Snackbar, Typography } from '@material-ui/core'
import React from 'react'
import trophy from '../../images/trophy.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function TrophySnackbar({
  openTrophySnackbar,
  closeTrophySnackbar,
  trophyName
}) {
  const tutorial = useSelector((state) => state.tutorial)

  return (
    <>
      <Link to={tutorial && tutorial.is === 'on' ? false : '/profil'}>
        <Snackbar
          open={openTrophySnackbar}
          autoHideDuration={7000}
          onClose={closeTrophySnackbar}
          message="Note archived"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Fab variant="extended" style={{ backgroundColor: '#4CAF50' }}>
            <img
              style={{
                width: '35px',
                height: '35px',
                margin: '0px 10px 0px 0px'
              }}
              src={trophy}
              alt="trophy"
            />
            <Grid container>
              <Grid item>
                <Typography
                  variant="button"
                  component="div"
                  color="textSecondary"
                  style={{
                    margin: '-5px 0px 0px 0px',
                    color: '#424242'
                  }}
                >
                  <strong>Trophy</strong>
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  style={{
                    margin: '15px 10px -1px -60px',
                    color: '#424242'
                  }}
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  {trophyName}
                </Typography>
              </Grid>
            </Grid>
          </Fab>
        </Snackbar>
      </Link>
    </>
  )
}
export default TrophySnackbar
