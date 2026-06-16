export interface Standings {
  readonly division: string;
  readonly losses: number;
  readonly pointsAgainst: number;
  readonly pointsDiff: number;
  readonly pointsFor: number;
  readonly teamId: number;
  readonly teamName: string;
  readonly winningPct: string;
  readonly wins: number;
}
