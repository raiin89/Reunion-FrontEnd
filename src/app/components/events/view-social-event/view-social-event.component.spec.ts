import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSocialEventComponent } from './view-social-event.component';

describe('ViewSocialEventComponent', () => {
  let component: ViewSocialEventComponent;
  let fixture: ComponentFixture<ViewSocialEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSocialEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSocialEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
