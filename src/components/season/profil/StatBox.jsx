import React from 'react'
import { Box, CircularProgress, Typography } from '@material-ui/core'

function StatBox({ value, text }) {
  return (
    <>
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="static" value={value} />
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
            <strong>{text}</strong>
          </Typography>
        </Box>
      </Box>
    </>
  )
}
export default StatBox
