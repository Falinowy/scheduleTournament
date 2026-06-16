import { Team } from './teams.model';

/**
 * @deprecated Use DivisionTeamsGroup from division-teams-group.model instead.
 */
export interface Division {
  divisionName: string;
  divisionTeams: Team[];
}
