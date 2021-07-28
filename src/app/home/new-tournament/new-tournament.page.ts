import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { EliteApiService } from 'src/app/services/elite-api.service';

@Component({
  selector: 'app-new-tournament',
  templateUrl: './new-tournament.page.html',
  styleUrls: ['./new-tournament.page.scss'],
})
export class NewTournamentPage implements OnInit {
  form: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private elite: EliteApiService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  dismissModal() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
  addTournament() {
    const newTournament = this.form.value;
    this.modalCtrl.dismiss(newTournament, 'added');
    this.elite.addTournament(this.form.value);
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
    });
  }
}
