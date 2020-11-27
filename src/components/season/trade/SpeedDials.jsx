import React, { useEffect, useState } from 'react'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import { Avatar } from '@material-ui/core'
import './speedial.css'

// const actions = [{ icon: <FavoriteIcon />, name: 'Play Game' }]

export default function SpeedDials({
  allTeamsData,
  myteamsUuid,
  getOtherTeams,
  right
}) {
  const [open, setOpen] = React.useState(false)
  // const [teamSelect, setTeamSelect] = useState('')
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
    // setTeamSelect(team.uuid)
    setLogo(team.logo)
    getOtherTeams(team.uuid)
    handleClose()
  }

  return (
    <div>
      <div>
        <SpeedDial
          ariaLabel="SpeedDial example"
          onClose={handleClose}
          onOpen={handleOpen}
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
          style={{ marginLeft: '20px' }}
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
      {/* {teamSelect ? (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => getOtherTeams(teamSelect)}
          disabled={!wantChangeTeam}
        >
          Start negociation
        </Button>
      ) : (
        ''
      )}
      <>
        {teamsData.uuid ? (
          <Button
            variant="outlined"
            color="primary"
            onClick={deleteOhterTeam}
            disabled={wantChangeTeam}
          >
            Change team
          </Button>
        ) : (
          ''
        )}
      </> */}
    </div>
  )
}
