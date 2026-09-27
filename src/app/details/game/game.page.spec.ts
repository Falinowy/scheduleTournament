import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GamePage } from './game.page';

describe('GamePage', () => {
  let component: GamePage;
  let fixture: ComponentFixture<GamePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ GamePage, IonicModule.forRoot() , IonicStorageModule.forRoot(), RouterTestingModule.withRoutes([])],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(GamePage);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tourneyId', 'test-tourney');
    fixture.componentRef.setInput('gameId', '1');
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
