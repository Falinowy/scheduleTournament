import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Tournament } from '../../models/tournament.model';
import { EliteApiService } from '../../services/elite-api.service';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.page.html',
  styleUrls: ['./new-team.page.scss'],
  imports: [IonicModule, FormsModule, ReactiveFormsModule],
})
export class NewTeamPage implements OnInit {
  tournament = input.required<Tournament>();

  form!: FormGroup;

  private readonly modalCtrl = inject(ModalController);
  private readonly formBuilder = inject(FormBuilder);
  private readonly eliteApi = inject(EliteApiService);

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      teams: this.formBuilder.group({
        id: new FormControl('', Validators.required),
        division: new FormControl('', Validators.required),
        coach: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
      }),
    });
  }

  dismissModal(): void {
    void this.modalCtrl.dismiss(null, 'cancel');
  }

  addTeam(): void {
    void this.modalCtrl.dismiss(this.form.value, 'added');
    this.eliteApi.addTeam(this.form.value, this.tournament().id);
  }
}
