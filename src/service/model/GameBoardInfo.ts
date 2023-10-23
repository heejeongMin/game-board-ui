import { GameBoardScoring } from "./GameBoardScoring";
import { PlayerInfo } from "./PlayerInfo";

export class GameBoardInfo {
  id: number;
  gameName: string;
  groupName: string;
  players: Array<PlayerInfo>;
  scoring: GameBoardScoring;

  constructor(
    id: number,
    gameName: string,
    groupName: string,
    players: Array<PlayerInfo>,
    scoring: GameBoardScoring
  ) {
    this.id = id;
    this.gameName = gameName;
    this.groupName = groupName;
    this.players = players;
    this.scoring = scoring;
  }
}
