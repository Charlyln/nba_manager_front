import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableBody,
  TableCell,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Avatar
} from '@material-ui/core'
import PlayerValue from '../mutliple/PlayerValue'

function DraftRecap({ openDraftRecap, handleCloseDraftRecap, draftRecapData }) {
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={openDraftRecap}
        onClose={handleCloseDraftRecap}
      >
        <DialogTitle>Draft recap</DialogTitle>

        <DialogContent>
          <TableContainer
            elevation={10}
            component={Paper}
            //   style={{ width: '60%', margin: '0 auto ' }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Pick</TableCell>
                  <TableCell align="Left">Name</TableCell>
                  <TableCell align="center">Value</TableCell>
                  <TableCell align="center">Potential</TableCell>
                  <TableCell align="center">Selected by</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {draftRecapData.map((item, i) => (
                  <TableRow>
                    <TableCell align="center">{i + 1}</TableCell>
                    <TableCell align="Left">{`${item.player.firstName} ${item.player.lastName}`}</TableCell>
                    <TableCell align="center">
                      <PlayerValue playerValue={item.player.value} />
                    </TableCell>
                    <TableCell align="center">
                      <PlayerValue
                        playerValue={item.player.potential}
                        changeBoxColor={true}
                      />
                    </TableCell>
                    <TableCell>
                      <Avatar style={{ margin: 'auto' }} src={item.team.logo} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDraftRecap} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default DraftRecap
