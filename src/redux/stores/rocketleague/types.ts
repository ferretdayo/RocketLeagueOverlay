import { GameStatus } from '../../../constants/RocketLeague/GameStatus'
import { StatfeedEventType } from "../../../types/RocketLeagueType";

export interface Counter {
  count: number
  date: Date
}

export interface PlayerStatus {
  assists: number;
  attacker: string;
  boost: number;
  cartouches: number;
  goals: number;
  hasCar: boolean;
  id: string;
  isDead: boolean;
  isSonic: boolean;
  name: string;
  primaryID: number;
  saves: number;
  score: number;
  shots: number;
  speed: number;
  team: number;
  touches: number;
  demos: number;
}

export type TeamsType = {
  [index: number]: {
    name: string;
    score: number;
  };
}

export interface GameResult {
  teams: TeamsType;
  players: {
    blue: PlayerStatus[],
    orange: PlayerStatus[]
  };
}

export interface RocketLeagueState {
  event: string;
  game: {
    ballSpeed: number;
    ballTeam: number;
    hasTarget: boolean;
    hasWinner: boolean;
    isOT: boolean;
    isReplay: boolean;
    target: string;
    teams: TeamsType;
    time: number;
    winner: string;
  };
  hasGame: boolean;
  players: {
    blue: PlayerStatus[],
    orange: PlayerStatus[]
  };
  goalScored: boolean;
  statfeedEvent: StatfeedEventType;
  isGoal: boolean;
  hasCreatedReplay: boolean;
  winnerTeam: number;
  gameStatus: GameStatus;
  result: GameResult;
}
