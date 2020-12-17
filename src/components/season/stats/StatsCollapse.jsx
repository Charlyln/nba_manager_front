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

function StatsCollapse({ player, SeasonUuid }) {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id={player.uuid}
        >
          <Avatar alt={player.lastName} src={player.photo} />
          <Typography
            style={{ alignSelf: 'center', flexBasis: '33.33%' }}
          >{`${player.firstName} ${player.lastName}`}</Typography>
          {/* <Typography
            style={{ alignSelf: 'center' }}
          >{`Average: pts`}</Typography> */}
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Team</TableCell>
                  <TableCell>Pts</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {player.PlayerStats.sort(function (a, b) {
                  return new Date(b.Game.uuid) - new Date(a.Game.uuid)
                }).map((stat, i) => (
                  <TableRow>
                    <TableCell>{`Match ${i + 1}`}</TableCell>
                    <TableCell>
                      {player.TeamUuid === stat.Game.Team.uuid
                        ? stat.Game.Visitor.name
                        : stat.Game.Team.name}
                    </TableCell>
                    <TableCell>{stat.pts}</TableCell>
                  </TableRow>
                ))}

                <TableRow selected>
                  <TableCell>Average</TableCell>
                  <TableCell> </TableCell>
                  <TableCell>
                    {player.PlayerStats.length > 0 ? (
                      <>{` ${(
                        player.PlayerStats.reduce(
                          (a, v) => (a = a + v.pts),
                          0
                        ) / player.PlayerStats.length
                      ).toFixed(1)}`}</>
                    ) : (
                      ''
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* <List>
            {player.PlayerStats.map((stat) => (
              <ListItem>
                <ListItemText primary={`Match ${stat.Game.date}`} />
              </ListItem>
            ))}
          </List> */}
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default StatsCollapse
