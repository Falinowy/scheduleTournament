import { Game } from './games.model';
import { Location } from './locations.model';
import { Standings } from './standings.model';
import { Team } from './teams.model';
import { Tournament } from './tournament.model';

export interface TourneyData {
  games: Game[];
  locations: Location[];
  standings: Standings[];
  teams: Team[];
  tournament: Tournament;
}

