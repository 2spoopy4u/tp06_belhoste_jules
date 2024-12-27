import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBrowserComponent } from './list-browser.component';

describe('ListBrowserComponent', () => {
  let component: ListBrowserComponent;
  let fixture: ComponentFixture<ListBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBrowserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
