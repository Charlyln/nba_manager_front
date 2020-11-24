import React from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Avatar, Typography } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import StatsHistoryDialog from './StatsHistoryDialog'

function StatsHistoryCollapse({ season }) {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id={season.uuid}
        >
          <Typography
            style={{ alignSelf: 'center', flexBasis: '33.33%' }}
          >{`${season.startYear} - ${season.endYear}`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Team 1</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Team 2</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Stats</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {season.Games.map((game, i) => (
                  <TableRow>
                    <TableCell
                      align="center"
                      style={{ width: '20%' }}
                    ></TableCell>
                    <TableCell align="center" style={{ width: '10%' }}>
                      <Avatar
                        style={{ margin: 'auto' }}
                        alt={game.Team.name}
                        src={game.Team.logo}
                      />
                    </TableCell>
                    <TableCell align="center">{game.team1}</TableCell>
                    <TableCell align="center" style={{ width: '1%' }}>
                      -
                    </TableCell>
                    <TableCell align="center">{game.team2}</TableCell>
                    <TableCell align="center" style={{ width: '10%' }}>
                      <Avatar
                        style={{ margin: 'auto' }}
                        alt={game.Visitor.Team.name}
                        src={game.Visitor.Team.logo}
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: '20%' }}
                    ></TableCell>
                    <TableCell align="center" style={{ width: '10%' }}>
                      <StatsHistoryDialog game={game} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default StatsHistoryCollapse
