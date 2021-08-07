import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeEmSpComponent } from './ve-em-sp.component';

describe('VeEmSpComponent', () => {
  let component: VeEmSpComponent;
  let fixture: ComponentFixture<VeEmSpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeEmSpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeEmSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
