import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewTournamentPage } from './new-tournament.page';

describe('NewTournamentPage', () => {
  let component: NewTournamentPage;
  let fixture: ComponentFixture<NewTournamentPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ NewTournamentPage, IonicModule.forRoot() , IonicStorageModule.forRoot(), RouterTestingModule.withRoutes([])],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewTournamentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
