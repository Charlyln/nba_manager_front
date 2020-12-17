import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Box, CircularProgress } from '@material-ui/core'
import CountUp from 'react-countup'

function TrainingBox({ value }) {
  return (
    <>
      <Box position="relative" display="inline-flex">
        <CircularProgress color="secondary" variant="static" value={value} />
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
            <strong>
              <CountUp end={value} duration={1} />
            </strong>
          </Typography>
        </Box>
      </Box>
    </>
  )
}
export default TrainingBox
