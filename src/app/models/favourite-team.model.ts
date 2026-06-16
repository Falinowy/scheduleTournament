import { Team } from './teams.model';

export interface FavouriteTeam {
  team: Team;
  tournamentId: string;
  tournamentName: string;
}
