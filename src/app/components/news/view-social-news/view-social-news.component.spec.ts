import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSocialNewsComponent } from './view-social-news.component';

describe('ViewSocialNewsComponent', () => {
  let component: ViewSocialNewsComponent;
  let fixture: ComponentFixture<ViewSocialNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSocialNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSocialNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
