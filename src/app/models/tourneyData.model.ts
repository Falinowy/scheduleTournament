import { Games } from './games.model';
import { Locations } from './locations.model';
import { Standings } from './standings.model';
import { Teams } from './teams.model';
import { Tournament } from './tournament.model';

export interface TourneyData {
  games: Games;
  locations: Locations;
  standings: Standings;
  teams: Teams;
  tournament: Tournament;
}

