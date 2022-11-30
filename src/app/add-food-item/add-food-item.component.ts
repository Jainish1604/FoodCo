import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FoodService } from '../services/food/food.service';
import { NotificationService } from '../services/notification.service';
import { Food } from '../shared/models/Food';

@Component({
  selector: 'app-add-food-item',
  templateUrl: './add-food-item.component.html',
  styleUrls: ['./add-food-item.component.css']
})
export class AddFoodItemComponent {
  foodlist!: any;
  AddFoodForm!: FormGroup;
  
  constructor(private api:FoodService , private notify:NotificationService,private Fb:FormBuilder){}
  
 
  Editmode:boolean=false;
  
  ngOnInit(): void {
    this.AddFoodForm = this.Fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      imageUrl: ['', [Validators.required]],
      origins: ['', [Validators.required]],
      tags: ['', [Validators.required]],
      price: ['', [Validators.required]],
      cookTime: ['', [Validators.required]],
      stars: ['', [Validators.required]],
      favorite: ['', [Validators.required]],
    });
  }

  switch() {
    this.Editmode = false;
  }
  addFood() {
    if (this.AddFoodForm.valid) {
      this.api.postFood(this.AddFoodForm.value).subscribe({
        next: (res) => {
          this.notify.showSuccess("Food item  Added Successfully", "FoodMine")

          this.api.getFood().subscribe((res) => {
            this.foodlist = res;
          });
        },
        error() {
          alert('Error while Adding food item');
        },
      });
      this.AddFoodForm.reset();
      // this.getAllFoodItems();
    } else {
      this.notify.showError("Please fill the form", "FoodMine")
    }
  }


}
