import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFoodDetailsComponent } from './edit-food-details.component';

describe('EditFoodDetailsComponent', () => {
  let component: EditFoodDetailsComponent;
  let fixture: ComponentFixture<EditFoodDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFoodDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFoodDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
