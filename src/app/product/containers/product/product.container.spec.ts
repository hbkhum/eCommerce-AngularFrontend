import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductContainer } from './product.container';

describe('ProductComponent', () => {
  let component: ProductContainer;
  let fixture: ComponentFixture<ProductContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
