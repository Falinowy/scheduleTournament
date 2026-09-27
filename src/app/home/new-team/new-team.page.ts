import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Tournament } from '../../models/tournament.model';
import { EliteApiService } from '../../services/elite-api.service';
import { ToastService } from '../../services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.page.html',
  styleUrls: ['./new-team.page.scss'],
  imports: [IonicModule, FormsModule, ReactiveFormsModule],
})
export class NewTeamPage implements OnInit {
  @Input() tournament!: Tournament;
  @Input() existingDivisions: string[] = [];

  form!: FormGroup;
  isNewDivision = false;

  private readonly modalCtrl = inject(ModalController);
  private readonly formBuilder = inject(FormBuilder);
  private readonly eliteApi = inject(EliteApiService);
  private readonly toastService = inject(ToastService);

  ngOnInit(): void {
    if (!this.existingDivisions || this.existingDivisions.length === 0) {
      this.isNewDivision = true;
    }
    this.form = this.formBuilder.group({
      teams: this.formBuilder.group({
        id: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]),
        division: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        coach: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      }),
    });
  }

  toggleDivisionInput(): void {
    this.isNewDivision = !this.isNewDivision;
    this.form.get('teams.division')?.setValue('');
  }

  dismissModal(): void {
    void this.modalCtrl.dismiss(null, 'cancel');
  }

  addTeam(): void {
    this.eliteApi.addTeam(this.form.value.teams, this.tournament.id).subscribe({
      next: () => void this.modalCtrl.dismiss(this.form.value, 'added'),
      error: async (err: HttpErrorResponse) => {
        console.error('Failed to add team', err);
        const message = err.error?.detail || 'An unexpected error occurred while adding the team.';
        await this.toastService.showError(message);
      }
    });
  }
}
