import React from 'react'
import { Color } from '../../constants/Styles/Color'
import { Team } from '../../constants/RocketLeague/Team'
import { GameResult } from '../../redux/stores/rocketleague/types'
import PlayerResult from '../molecules/PlayerResult/PlayerResult'

type Props = {
  readonly gameResult: GameResult
  readonly winner: number
}

const PlayersResult: React.FC<Props> = ({ gameResult, winner }: Props) => {
  const convertColumnName = [
    {
      columnName: 'goals',
      displayName: 'GOALS',
    },
    {
      columnName: 'assists',
      displayName: 'ASSISTS',
    },
    {
      columnName: 'saves',
      displayName: 'SAVES',
    },
    {
      columnName: 'shots',
      displayName: 'SHOTS',
    },
    {
      columnName: 'touches',
      displayName: 'BALL TOUCHES',
    },
    {
      columnName: 'score',
      displayName: 'SCORE',
    }
  ]

  // それぞれ(goals, assists, saves, shots, score)の割合を算出する関数
  const calcTarget = (convertColumnName: { columnName: string, displayName: string }[], gameResult: GameResult) => {
    return convertColumnName.map(column => {
      const blueAmount = gameResult.players.blue
        .map(player => {
          const key = column.columnName as keyof typeof player
          return player[key]
        })
        .reduce((prev, current): number => Number(prev) + Number(current), 0)

      const orangeAmount = gameResult.players.orange
        .map(player => {
          const key = column.columnName as keyof typeof player
          return player[key]
        })
        .reduce((prev, current): number => Number(prev) + Number(current), 0)

      const isZero = Number(orangeAmount) + Number(blueAmount) === 0
      let blue = 0
      let orange = 0
      if (!isZero) {
        blue = Number(blueAmount) * 100 / (Number(orangeAmount) + Number(blueAmount))
        orange = Number(orangeAmount) * 100 / (Number(orangeAmount) + Number(blueAmount))
      }
      return {
        [column.columnName]: {
          isZero,
          orange,
          blue,
        }
      }
    })
      .reduce((result, current) => {
        let keys: string[] = Object.keys(current);
        result[keys[0]] = current[keys[0]];
        return result;
      }, {})
  }

  const analyze = calcTarget(convertColumnName, gameResult)

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
        <PlayerResult
          players={gameResult.players.blue}
          isWin={winner === Team.BLUE}
          teamColor={Team.BLUE}
          targetColumn={convertColumnName}
        />
        <div>
          {convertColumnName.map((column) => (
            <div key={column.columnName} style={{ flexDirection: 'column', margin: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '59px', fontSize: '18px', color: Color.WHITE }}>
              {column.displayName}
              <div style={{ margin: '10px 0 0', backgroundColor: analyze[column.columnName].isZero ? Color.TRANS_LIGHT_GRAY : Color.ORANGE, height: '5px', width: '100%' }}>
                {!analyze[column.columnName].isZero && (
                  <div style={{ backgroundColor: Color.LIGHT_BLUE, height: '5px', width: `${analyze[column.columnName].blue}%` }}></div>
                )}
              </div>
            </div>
          ))}
        </div>
        <PlayerResult
          players={gameResult.players.orange}
          isWin={winner === Team.ORANGE}
          teamColor={Team.ORANGE}
          targetColumn={convertColumnName}
        />
      </div>
    </>
  )
}

export default PlayersResult
