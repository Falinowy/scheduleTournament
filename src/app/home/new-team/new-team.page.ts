import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { EliteApiService } from 'src/app/services/elite-api.service';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.page.html',
  styleUrls: ['./new-team.page.scss'],
})
export class NewTeamPage implements OnInit {
  @Input() id: string;
  form: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private elite: EliteApiService) { }

  ngOnInit() {
    this.buildForm();
  }

  dismissModal() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  addTeam() {
    const newTeam = this.form.value;
    this.modalCtrl.dismiss(newTeam, 'added');
    this.elite.addTeam(this.form.value, this.id);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      teams: this.formBuilder.group({
        id: new FormControl('', Validators.required),
        division: new FormControl('', Validators.required),
        coach: new FormControl('', Validators.required),
        name:  new FormControl('', Validators.required),
      })
    });
  }
}
