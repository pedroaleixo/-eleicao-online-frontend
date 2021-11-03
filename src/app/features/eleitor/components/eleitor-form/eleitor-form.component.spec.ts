import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleitorFormComponent } from './eleitor-form.component';

describe('EleitorFormComponent', () => {
  let component: EleitorFormComponent;
  let fixture: ComponentFixture<EleitorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EleitorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EleitorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
