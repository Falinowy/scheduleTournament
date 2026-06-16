import { Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Standings } from '../../models/standings.model';
import { Team } from '../../models/teams.model';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
  imports: [IonicModule, FormsModule],
})
export class StandingsComponent {
  allStandings = input.required<Standings[]>();
  team = input.required<Team>();

  divisionFilter = signal<string>('division');

  standings = computed(() => {
    if (this.divisionFilter() === 'all') {
      return this.allStandings();
    } else {
      return this.allStandings().filter((s) => s.division === this.team().division);
    }
  });

  getHeader(record: Standings, recordIndex: number, records: Standings[]): string | null {
    if (recordIndex === 0 || record.division !== records[recordIndex - 1].division) {
      return record.division;
    }
    return null;
  }
}
