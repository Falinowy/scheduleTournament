import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeamHomePage } from './team-home.page';

describe('TeamHomePage', () => {
  let component: TeamHomePage;
  let fixture: ComponentFixture<TeamHomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ TeamHomePage, IonicModule.forRoot() , IonicStorageModule.forRoot(), RouterTestingModule.withRoutes([])],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeamHomePage);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tourneyId', 'test-tourney');
    fixture.componentRef.setInput('teamId', '1');
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
