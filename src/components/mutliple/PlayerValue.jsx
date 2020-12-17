import { Box, CircularProgress, Typography } from '@material-ui/core'
import React, { useState } from 'react'

function PlayerValue({ playerValue, changeBoxColor, playerTeamUuid }) {
  const [TeamUuid] = useState(window.localStorage.getItem('TeamUuid'))
  return (
    <>
      <Box position="relative" display="inline-flex" className="tutoMyRoster6">
        <CircularProgress
          color={
            changeBoxColor && playerTeamUuid !== TeamUuid
              ? 'secondary'
              : 'primary'
          }
          variant="static"
          value={playerValue}
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
          <Typography variant="button" component="div" color="textSecondary">
            <strong>{Math.round(playerValue)}</strong>
          </Typography>
        </Box>
      </Box>
    </>
  )
}
export default PlayerValue
