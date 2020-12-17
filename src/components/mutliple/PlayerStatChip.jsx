import { Badge, Chip } from '@material-ui/core'
import React from 'react'

function PlayerStatChip({ statMin, statBeg, statMax, divisor }) {
  const diff =
    Math.round(((statMin + statMax) / 2 / divisor) * 100) -
    Math.round(((statBeg + statMax) / 2 / divisor) * 100)

  return (
    <>
      <Badge
        invisible={statMin === statBeg || diff === 0}
        badgeContent={`${diff > 0 ? '+' : ''}${diff}`}
        color={diff > 0 ? 'primary' : 'secondary'}
      >
        <Chip
          className={statMin > statBeg ? 'tutoMyRoster5' : 'tutoMyRoster5'}
          label={Math.round(((statMin + statMax) / 2 / divisor) * 100)}
        />
      </Badge>
    </>
  )
}
export default PlayerStatChip
