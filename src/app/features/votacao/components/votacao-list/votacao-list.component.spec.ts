import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotacaoListComponent } from './votacao-list.component';

describe('VotacaoListComponent', () => {
  let component: VotacaoListComponent;
  let fixture: ComponentFixture<VotacaoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotacaoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotacaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
