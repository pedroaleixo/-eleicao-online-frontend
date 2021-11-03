import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleicaoFormComponent } from './eleicao-form.component';

describe('EleicaoFormComponent', () => {
  let component: EleicaoFormComponent;
  let fixture: ComponentFixture<EleicaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EleicaoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EleicaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
