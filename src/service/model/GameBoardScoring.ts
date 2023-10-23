export const GameBoardScoring = {
  TOTAL_SCORE_LOWEST: "TOTAL_SCORE_LOWEST",
  TOTAL_SCORE_HIGHEST: "TOTAL_SCORE_HIGHEST",
  WINNING_COUNT: "WINNING_COUNT",
} as const;

export type GameBoardScoring =
  (typeof GameBoardScoring)[keyof typeof GameBoardScoring];

export function toGameBoardScoring(scoring: string): GameBoardScoring {
  if (scoring == "total score lowest") {
    return GameBoardScoring.TOTAL_SCORE_LOWEST;
  } else if (scoring == "total score highest") {
    return GameBoardScoring.TOTAL_SCORE_HIGHEST;
  }

  return GameBoardScoring.WINNING_COUNT;
}
