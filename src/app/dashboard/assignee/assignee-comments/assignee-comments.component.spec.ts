import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigneeCommentsComponent } from './assignee-comments.component';

describe('AssigneeCommentsComponent', () => {
  let component: AssigneeCommentsComponent;
  let fixture: ComponentFixture<AssigneeCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssigneeCommentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigneeCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
