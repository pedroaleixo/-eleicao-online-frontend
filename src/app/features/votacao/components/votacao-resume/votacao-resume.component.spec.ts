import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotacaoResumeComponent } from './votacao-resume.component';

describe('VotacaoResumeComponent', () => {
  let component: VotacaoResumeComponent;
  let fixture: ComponentFixture<VotacaoResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotacaoResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotacaoResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
