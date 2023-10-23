export class PlayerInfo {
  id?: number;

  name: string;

  score: number;

  constructor(name: string, score: number, id?: number) {
    this.id = id;
    this.name = name;
    this.score = score;
  }
}
