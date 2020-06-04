import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesExperiencesComponent } from './mes-experiences.component';

describe('MesExperiencesComponent', () => {
  let component: MesExperiencesComponent;
  let fixture: ComponentFixture<MesExperiencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesExperiencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
