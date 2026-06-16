export interface Game {
  readonly id: number;
  readonly locationId: string;
  readonly team1: string;
  readonly team1Id: number;
  readonly team1Score: string;
  readonly team2: string;
  readonly team2Id: number;
  readonly team2Score: string;
  readonly location: string;
  readonly locationUrl: string;
  readonly time: number;
}

