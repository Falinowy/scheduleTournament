import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewTeamPage } from './new-team.page';

describe('NewTeamPage', () => {
  let component: NewTeamPage;
  let fixture: ComponentFixture<NewTeamPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ NewTeamPage, IonicModule.forRoot() , IonicStorageModule.forRoot(), RouterTestingModule.withRoutes([])],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewTeamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
