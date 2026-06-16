import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { EliteApiService } from '../../services/elite-api.service';

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

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
    });
  }

  dismissModal(): void {
    void this.modalCtrl.dismiss(null, 'cancel');
  }

  addTournament(): void {
    void this.modalCtrl.dismiss(this.form.value, 'added');
    this.eliteApi.addTournament(this.form.value);
  }
}
