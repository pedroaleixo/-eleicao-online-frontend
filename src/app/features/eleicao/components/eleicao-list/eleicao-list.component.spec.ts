import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleicaoListComponent } from './eleicao-list.component';

describe('EleicaoListComponent', () => {
  let component: EleicaoListComponent;
  let fixture: ComponentFixture<EleicaoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EleicaoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EleicaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
