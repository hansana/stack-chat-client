import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLabelComponent } from './chat-label.component';

describe('ChatLabelComponent', () => {
  let component: ChatLabelComponent;
  let fixture: ComponentFixture<ChatLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
