import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapiTestComponent } from './swapi-test.component';

describe('SwapiTestComponent', () => {
  let component: SwapiTestComponent;
  let fixture: ComponentFixture<SwapiTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwapiTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapiTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
