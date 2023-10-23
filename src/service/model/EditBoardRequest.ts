import { PlayerInfo } from "./PlayerInfo";

export class EditBoardRequest {
  players: Array<PlayerInfo>;

  constructor(players: Array<PlayerInfo>) {
    this.players = players;
  }
}
