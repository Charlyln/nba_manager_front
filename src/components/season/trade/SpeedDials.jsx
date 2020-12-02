import React, { useEffect, useState } from 'react'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import { Avatar, Typography } from '@material-ui/core'
import './speedial.css'

export default function SpeedDials({
  allTeamsData,
  myteamsUuid,
  getOtherTeams,
  right
}) {
  const [open, setOpen] = React.useState(false)
  const [logo, setLogo] = useState('')

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true)
      const timer2 = setTimeout(() => {
        setOpen(false)
      }, 1500)
      return () => clearTimeout(timer2)
    }, 1500)

    return () => clearTimeout(timer)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectTeam = (team) => {
    setLogo(team.logo)
    getOtherTeams(team.uuid)
    handleClose()
  }

  return (
    <div>
      <div style={{ marginLeft: '20px' }}>
        <Typography
          variant="button"
          component="div"
          color="textSecondary"
          style={{
            color: '#616060',
            marginBottom: '15px'
          }}
        >
          <strong>Select the team</strong>
        </Typography>
        <SpeedDial
          ariaLabel="SpeedDial example"
          onClose={handleClose}
          onOpen={handleOpen}
          variant="extended"
          icon={
            right.length === 0 ? (
              <SpeedDialIcon />
            ) : open ? (
              <SpeedDialIcon />
            ) : !open && logo ? (
              <Avatar src={logo} />
            ) : (
              <SpeedDialIcon />
            )
          }
          open={open}
          direction="right"
        >
          {allTeamsData
            .filter((team) => team.uuid !== myteamsUuid)
            .map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={<Avatar src={action.logo} />}
                tooltipTitle={action.name}
                onClick={() => selectTeam(action)}
                tooltipPlacement="bottom"
              />
            ))}
        </SpeedDial>
      </div>
    </div>
  )
}
