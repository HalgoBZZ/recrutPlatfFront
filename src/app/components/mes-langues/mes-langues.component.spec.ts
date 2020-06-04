import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesLanguesComponent } from './mes-langues.component';

describe('MesLanguesComponent', () => {
  let component: MesLanguesComponent;
  let fixture: ComponentFixture<MesLanguesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesLanguesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesLanguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
