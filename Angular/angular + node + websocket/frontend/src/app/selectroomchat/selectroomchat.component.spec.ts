import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectroomchatComponent } from './selectroomchat.component';

describe('SelectroomchatComponent', () => {
  let component: SelectroomchatComponent;
  let fixture: ComponentFixture<SelectroomchatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectroomchatComponent]
    });
    fixture = TestBed.createComponent(SelectroomchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
