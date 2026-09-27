import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyTeamsPage } from './my-teams.page';

describe('MyTeamsPage', () => {
  let component: MyTeamsPage;
  let fixture: ComponentFixture<MyTeamsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ MyTeamsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyTeamsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
