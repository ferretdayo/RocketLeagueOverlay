export type UpdateGameType = {
  event: string;
  game: {
    ballSpeed: number;
    ballTeam: number;
    hasTarget: boolean;
    hasWinner: boolean;
    isOT: boolean;
    isReplay: boolean;
    target: string;
    teams: {
      [index: number]: {
        name: string;
        score: number;
      };
    };
    time: number;
    winner: string;
  };
  hasGame: boolean;
  players: {
    [player: string]: {
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
    };
  };
}