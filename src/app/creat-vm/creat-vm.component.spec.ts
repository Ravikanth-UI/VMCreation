import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatVmComponent } from './creat-vm.component';

describe('CreatVmComponent', () => {
  let component: CreatVmComponent;
  let fixture: ComponentFixture<CreatVmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatVmComponent]
    });
    fixture = TestBed.createComponent(CreatVmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
