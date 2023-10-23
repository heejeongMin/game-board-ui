import { GameBoardScoring } from "./GameBoardScoring";

export class CreateGameBoardRequest {
  gameName: string;

  groupName: string;

  players: Array<string>;

  scoring: GameBoardScoring;

  constructor(
    gameName: string,
    groupName: string,
    players: Array<string>,
    scoring: GameBoardScoring
  ) {
    this.gameName = gameName;
    this.groupName = groupName;
    this.players = players;
    this.scoring = scoring;
  }
}
