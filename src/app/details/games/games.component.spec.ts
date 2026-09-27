import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GamesComponent } from './games.component';

describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ GamesComponent, IonicModule.forRoot() , IonicStorageModule.forRoot(), RouterTestingModule.withRoutes([])],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('games', []);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
