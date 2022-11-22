import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailSliderComponent } from './product-detail-slider.component';

describe('ProductDetailSliderComponent', () => {
  let component: ProductDetailSliderComponent;
  let fixture: ComponentFixture<ProductDetailSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
