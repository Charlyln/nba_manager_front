import { Button, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import TradeIcon from './TradeIcon'

function TradeSelect({
  allTeamsData,
  myteamsUuid,
  getOtherTeams,
  teamsData,
  deleteOhterTeam,
  wantChangeTeam
}) {
  const [teamSelect, setTeamSelect] = useState('')

  const selectTeam = (uuid) => {
    setTeamSelect(uuid)
  }

  return (
    <>
      {allTeamsData
        .filter((team) => team.uuid !== myteamsUuid)
        .map((team) => (
          <Grid item xs={6} sm={2} md={1} lg={1}>
            <TradeIcon
              team={team}
              selectTeam={selectTeam}
              teamSelect={teamSelect}
              teamsData={teamsData}
              wantChangeTeam={wantChangeTeam}
            />
          </Grid>
        ))}

      {teamSelect ? (
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
    </>
  )
}

export default TradeSelect
