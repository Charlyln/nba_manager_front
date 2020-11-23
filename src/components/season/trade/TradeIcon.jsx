import { Avatar, IconButton } from '@material-ui/core'
import React from 'react'

function TradeIcon({
  team,
  selectTeam,
  teamSelect,
  teamsData,
  wantChangeTeam
}) {
  return (
    <>
      <IconButton
        style={{
          background: teamSelect === team.uuid ? '#E59923' : ''
        }}
        onClick={() => selectTeam(team.uuid)}
        disabled={!wantChangeTeam}
      >
        <Avatar src={team.logo} />
      </IconButton>
    </>
  )
}

export default TradeIcon
