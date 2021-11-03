import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoDetailComponent } from './resultado-detail.component';

describe('ResultadoDetailComponent', () => {
  let component: ResultadoDetailComponent;
  let fixture: ComponentFixture<ResultadoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
