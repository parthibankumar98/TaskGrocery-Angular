import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStockComponent } from './new-stock.component';

describe('NewStockComponent', () => {
  let component: NewStockComponent;
  let fixture: ComponentFixture<NewStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
