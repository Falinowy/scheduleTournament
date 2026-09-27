import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { EliteApiService } from '../../services/elite-api.service';
import { ToastService } from '../../services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-tournament',
  templateUrl: './new-tournament.page.html',
  styleUrls: ['./new-tournament.page.scss'],
  imports: [IonicModule, FormsModule, ReactiveFormsModule],
})
export class NewTournamentPage implements OnInit {
  form!: FormGroup;

  private readonly modalCtrl = inject(ModalController);
  private readonly formBuilder = inject(FormBuilder);
  private readonly eliteApi = inject(EliteApiService);
  private readonly toastService = inject(ToastService);

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });
  }

  dismissModal(): void {
    void this.modalCtrl.dismiss(null, 'cancel');
  }

  addTournament(): void {
    this.eliteApi.addTournament(this.form.value).subscribe({
      next: () => void this.modalCtrl.dismiss(this.form.value, 'added'),
      error: async (err: HttpErrorResponse) => {
        console.error('Failed to add tournament', err);
        const message = err.error?.detail || 'An unexpected error occurred while adding the tournament.';
        await this.toastService.showError(message);
      }
    });
  }
}
