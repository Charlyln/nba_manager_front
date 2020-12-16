import { Chip } from '@material-ui/core'
import React from 'react'
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle'

function PlayerStatChip({ statMin, statBeg, statMax, divisor }) {
  return (
    <>
      <Chip
        className={statMin > statBeg ? 'tutoMyRoster5' : ''}
        avatar={
          statMin > statBeg ? (
            <>
              <ArrowDropDownCircleIcon
                style={{
                  margin: '0px -8px 0px 5px',
                  transform: 'rotate(180deg)',
                  color: 'rgb(76, 175, 80)'
                }}
              />
            </>
          ) : statMin < statBeg ? (
            <ArrowDropDownCircleIcon
              style={{
                margin: '0px -8px 0px 5px',
                color: 'rgb(217, 48, 33)'
              }}
            />
          ) : (
            ''
          )
        }
        label={Math.round(((statMin + statMax) / 2 / divisor) * 100)}
      />
    </>
  )
}
export default PlayerStatChip
