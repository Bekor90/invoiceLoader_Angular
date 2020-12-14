import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceLoaderComponent } from './invoice-loader.component';

describe('InvoiceLoaderComponent', () => {
  let component: InvoiceLoaderComponent;
  let fixture: ComponentFixture<InvoiceLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
