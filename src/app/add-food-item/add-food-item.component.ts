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


  ngOnInit(): void {
    this.form = this.Fb.group({
      name: new FormControl(['', [Validators.required, Validators.minLength(3)]]),
      imageUrl:  new FormControl(['', [Validators.required]]),
      origins:  new FormControl(['', [Validators.required]]),
      tags:  new FormControl(['', [Validators.required]]),
      price:  new FormControl(['', [Validators.required]]),
      cookTime:  new FormControl(['', [Validators.required]]),
      stars:  new FormControl(['', [Validators.required]]),
      favorite:  new FormControl(['', [Validators.required]]),
    });
  }


  switch(){}
  Editmode!:string



  addFood() {
    if (this.form.valid) {
      this.api.postFood(this.form.value).subscribe({
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
      this.form.reset();
      this.getAllFoodItems();
    } else {
      this.notify.showError("Please fill the form", "FoodMine")
    }
  }
  form!: FormGroup;
  UpdatefoodDetails(){}
  getAllFoodItems(){}

}
