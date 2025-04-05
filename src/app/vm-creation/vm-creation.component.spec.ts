import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VMCreationComponent } from './vm-creation.component';

describe('VMCreationComponent', () => {
  let component: VMCreationComponent;
  let fixture: ComponentFixture<VMCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VMCreationComponent]
    });
    fixture = TestBed.createComponent(VMCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
