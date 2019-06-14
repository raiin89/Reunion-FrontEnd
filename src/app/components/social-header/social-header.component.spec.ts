import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialHeaderComponent } from './social-header.component';

describe('SocialHeaderComponent', () => {
  let component: SocialHeaderComponent;
  let fixture: ComponentFixture<SocialHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
