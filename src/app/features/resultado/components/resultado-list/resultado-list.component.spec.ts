import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoListComponent } from './resultado-list.component';

describe('ResultadoListComponent', () => {
  let component: ResultadoListComponent;
  let fixture: ComponentFixture<ResultadoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
