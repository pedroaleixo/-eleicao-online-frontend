import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleitorListComponent } from './eleitor-list.component';

describe('EleitorListComponent', () => {
  let component: EleitorListComponent;
  let fixture: ComponentFixture<EleitorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EleitorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EleitorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
