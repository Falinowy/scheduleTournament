export interface TeamGameView {
  gameId: number;
  opponent: string;
  time: number;
  location: string;
  locationUrl: string;
  scoreDisplay: string;
  homeAway: string;
  division?: string;
}
